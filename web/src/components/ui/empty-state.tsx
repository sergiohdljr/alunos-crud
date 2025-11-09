import { FileX, Users } from "lucide-react"
import { Button } from "./button"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  title = "Nenhum dado encontrado",
  description = "Não há informações para exibir no momento.",
  icon,
  action
}: EmptyStateProps) {
  const defaultIcon = <FileX className="h-12 w-12 text-muted-foreground" />

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm whitespace-pre-line">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="default">
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function EmptyStudentsState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      title="Nenhum aluno encontrado"
      description="Não encontramos alunos com os filtros aplicados.Tente ajustar os critérios de busca ou limpar os filtros."
      icon={<Users className="h-12 w-12 text-muted-foreground" />}
      action={onClearFilters ? {
        label: "Limpar filtros",
        onClick: onClearFilters
      } : undefined}
    />
  )
}
