import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ActionTableDropdown } from "./action-table-dropdown"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { studentsApi, type Student } from "@/api/students"

export const columns: ColumnDef<Student>[] = [
    {
        id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
            }
          })
          
          const handleDelete = (id: number) => {
           deleteStudentMutation.mutate(id)
          }
          
          return (
            <ActionTableDropdown 
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        },
      },
]
