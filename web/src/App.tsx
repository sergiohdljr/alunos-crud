import { DataTable } from './components/students/data-table'
import { columns } from './components/students/columns'
import { useQuery } from '@tanstack/react-query'
import { studentsApi } from './api/students'
import { Toaster } from './components/ui/sonner'
import { useTableFilters } from './hooks/table-filters'
import { LoadingState } from './components/loading-state'
import { ErrorState } from './components/error-state'

function App() {
  const {inputFilters, setInputFilters, activeFilters, applyFilters, resetFilters} = useTableFilters()

  const {data, isLoading, error} = useQuery({
    queryKey: ['students', activeFilters],
    queryFn: async () => await studentsApi.getAll(activeFilters)
  })
 
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-emerald-400' >
      <div className='lg:w-4/6 w-full px-4' >
        <div className='mb-6 sm:mb-8 text-center px-2'>
          <h1 className='mt-14 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
            Sistema de Gerenciamento de Alunos
          </h1>
          <p className='text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400'>
            Gerencie os dados dos alunos de forma simples e eficiente
          </p>
        </div>
        <div >
        {isLoading && <LoadingState message="Carregando alunos..." />}
        {error && <ErrorState message="Erro ao carregar lista de alunos" />}
        {!isLoading && !error && <DataTable 
          columns={columns} 
          data={data || []} 
          inputFilters={inputFilters} 
          setInputFilters={setInputFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
