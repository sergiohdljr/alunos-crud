import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  showRetryButton?: boolean
}

export function ErrorState({ 
  message = "Erro ao carregar dados", 
  onRetry,
  showRetryButton = true 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center space-x-3 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
        Ocorreu um problema ao carregar as informações. Verifique sua conexão e tente novamente.
      </div>

      {showRetryButton && onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Tentar novamente</span>
        </Button>
      )}
    </div>
  )
}
