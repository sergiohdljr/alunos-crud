import { DataTable } from './components/students/data-table'
import { columns } from './components/students/columns'

const data = [
    {
        name: "Sergio",
        email: "sergio@sergio.com",
        cpf: "123.456.789-00",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Maria",
        email: "maria@maria.com",
        cpf: "987.654.321-00",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Pedro",
        email: "pedro@pedro.com",
        cpf: "111.222.333-44",
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

function App() {

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center' >
      <div className='w-4/6' >
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default App
