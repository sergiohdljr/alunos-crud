import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center space-x-3">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Por favor, aguarde...
      </div>
    </div>
  )
}
