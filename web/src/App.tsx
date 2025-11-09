import { DataTable } from './components/students/data-table'
import { columns } from './components/students/columns'
import { useQuery } from '@tanstack/react-query'
import { studentsApi } from './api/students'

function App() {

 const {data, isLoading, error} = useQuery({
    queryKey: ['students'],
    queryFn: studentsApi.getAll
 })

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center' >
      <div className='w-4/6' >
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar dados</div>}
      {!isLoading && !error && <DataTable columns={columns} data={data || []} />}
      </div>
    </div>
  )
}

export default App
