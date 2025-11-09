import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { studentsApi, type Student } from "@/api/students"
import { toast } from "sonner"
import { UpdateStudentDialog } from "./update-student-dialog"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"

export const columns: ColumnDef<Student>[] = [
    {
        header: "Nome",
        accessorKey: "name",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "CPF",
        accessorKey: "cpf",
        cell: ({ row }) => row.original.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    },
    {
        header: "Criado em",
        accessorKey: "created_at",
        cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
        header:'atualizado em',
        accessorKey: 'updated_at',
        cell: ({ row }) => new Date(row.original.updated_at).toLocaleDateString(),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const student = row.original
          
          const queryClient = useQueryClient()

          const handleEdit = (student: Student) => {
            console.log("Edit student:", student)
          }
          
          const deleteStudentMutation = useMutation({
            mutationFn: (studentId: number) => studentsApi.delete(studentId),
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['students'] })
              toast.success('Aluno deletado com sucesso')
            }
          })
          
          const handleDelete = (id: number) => {
           deleteStudentMutation.mutate(id)
          }
          
          return (
            <div className="flex items-end justify-end gap-2" >
            <Button className="flex items-center justify-center" onClick={() => handleDelete(student.id)} variant="outline">
              <Trash color="red" className="h-4 w-4" />
            </Button>
            <UpdateStudentDialog id={student.id} currentStudent={student} />
            </div>
          )
        },
      },
]
