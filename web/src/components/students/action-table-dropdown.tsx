import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Student } from "@/api/students"

interface ActionTableDropdownProps {
  student: Student
  onEdit?: (student: Student) => void
  onDelete?: (id: number) => void
}

export function ActionTableDropdown({ student, onEdit, onDelete }: ActionTableDropdownProps) {
  const handleCopyCPF = () => {
    navigator.clipboard.writeText(student.cpf)
  }

  const handleEdit = () => {
    onEdit?.(student)
  }

  const handleDelete = (id: number) => {
    onDelete?.(id)
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
        <DropdownMenuItem onClick={() => handleDelete(student.id)}>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
