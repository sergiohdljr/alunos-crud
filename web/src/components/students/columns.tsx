import type { ColumnDef } from "@tanstack/react-table"
import { type Student } from "@/api/students"
import { UpdateStudentDialog } from "./update-student-dialog"
import { DeleteStudentAction } from "./delete-student-action"

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
          
          return (
            <div className="flex items-end justify-end gap-2" >
              <DeleteStudentAction id={student.id} />
              <UpdateStudentDialog key={`update-${student.id}-${student.updated_at}`} id={student.id} currentStudent={student} />
            </div>
          )
        },
      },
]
