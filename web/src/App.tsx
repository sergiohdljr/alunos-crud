import { DataTable } from './components/students/data-table'
import { columns } from './components/students/columns'
import { useQuery } from '@tanstack/react-query'
import { studentsApi } from './api/students'
import { Toaster } from './components/ui/sonner'
import { useTableFilters } from './hooks/table-filters'

function App() {
  const {inputFilters, setInputFilters, activeFilters, applyFilters, resetFilters} = useTableFilters()

  const {data, isLoading, error} = useQuery({
    queryKey: ['students', activeFilters],
    queryFn: async () => await studentsApi.getAll(activeFilters)
  })
 
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center' >
      <div className='w-4/6' >
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar dados</div>}
      {!isLoading && !error && <DataTable 
        columns={columns} 
        data={data || []} 
        inputFilters={inputFilters} 
        setInputFilters={setInputFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />}
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
