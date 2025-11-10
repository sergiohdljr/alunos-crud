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
import { Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { studentsApi } from "@/api/students"
import { toast } from "sonner"
import { useState } from "react"

interface DeleteStudentActionProps {
  id: number
}

export function DeleteStudentAction({ id }: DeleteStudentActionProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const deleteStudentMutation = useMutation({
    mutationFn: async(studentId: number) => await studentsApi.delete(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Aluno deletado com sucesso')
      setOpen(false)
    },
    onError: ({message}) => {
      toast.error('Erro ao deletar aluno', {
        description: message
      })
    }
  })

  const handleDelete = () => {
    deleteStudentMutation.mutate(id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center justify-center" 
          variant="outline"
          size="sm"
        >
          <Trash color="red" className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-emerald-400 border border-black">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription className="text-black" >
            Tem certeza que deseja deletar este aluno? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleteStudentMutation.isPending}
          >
            {deleteStudentMutation.isPending ? 'Deletando...' : 'Deletar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}