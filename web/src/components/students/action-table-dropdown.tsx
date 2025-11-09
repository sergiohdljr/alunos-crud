import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type Student = {
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date
}

interface ActionTableDropdownProps {
  student: Student
  onEdit?: (student: Student) => void
  onDelete?: (student: Student) => void
}

export function ActionTableDropdown({ student, onEdit, onDelete }: ActionTableDropdownProps) {
  const handleCopyCPF = () => {
    navigator.clipboard.writeText(student.cpf)
  }

  const handleEdit = () => {
    onEdit?.(student)
  }

  const handleDelete = () => {
    onDelete?.(student)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyCPF}>
          Copiar CPF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
