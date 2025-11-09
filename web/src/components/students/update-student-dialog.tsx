import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import type { Student, StudentPayload } from "@/api/student-types"
import { studentsApi } from "@/api/students"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { PencilIcon } from "lucide-react"

  type UpdateStudentDialogProps = {
    id: number;
    currentStudent: Student;
  }
    

export function UpdateStudentDialog({ id, currentStudent }: UpdateStudentDialogProps) {
  const [student, setStudent] = useState<StudentPayload>({
    name: currentStudent.name,
    email: currentStudent.email,
    cpf: currentStudent.cpf
  })
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: updateStudent } = useMutation({
    mutationFn: async (student: StudentPayload) => await studentsApi.update(id,student),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"]
      })
      setOpen(false)
      toast.success("Aluno atualizado com sucesso")
    },
    onError: ({message}) => {
      toast.error("Erro ao atualizar aluno", {
        description: message
      })
    }
  })
  const saveStudent = () => {
    updateStudent(student)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Aluno</DialogTitle>
            <DialogDescription>
             Atualize um aluno a tabela
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nome</Label>
              <Input id="name-1" name="name" required value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" required value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cpf-1">CPF</Label>
              <Input id="cpf-1" name="cpf" required pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}" value={student.cpf} onChange={(e) => setStudent({ ...student, cpf: e.target.value })}  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={saveStudent}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
