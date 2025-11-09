import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ActionTableDropdown } from "./action-table-dropdown"

type Student = {
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date
}

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
    },
    {
        header: "Criado em",
        accessorKey: "createdAt",
        cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
    },
    {
        header:'atualizado em',
        accessorKey: 'updatedAt',
        cell: ({ row }) => row.original.updatedAt.toLocaleDateString(),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const student = row.original
          
          const handleEdit = (student: Student) => {
            console.log("Edit student:", student)
            // TODO: Implement edit functionality
          }
          
          const handleDelete = (student: Student) => {
            console.log("Delete student:", student)
            // TODO: Implement delete functionality
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
