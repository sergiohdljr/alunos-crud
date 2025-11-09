import { DataTable } from './components/students/data-table'
import { columns } from './components/students/columns'

const data = [
    {
        name: "Ana Silva",
        email: "ana.silva@email.com",
        cpf: "123.456.789-01",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
    },
    {
        name: "Bruno Santos",
        email: "bruno.santos@email.com",
        cpf: "234.567.890-12",
        createdAt: new Date("2024-01-16"),
        updatedAt: new Date("2024-01-20")
    },
    {
        name: "Carla Oliveira",
        email: "carla.oliveira@email.com",
        cpf: "345.678.901-23",
        createdAt: new Date("2024-01-17"),
        updatedAt: new Date("2024-01-17")
    },
    {
        name: "Daniel Costa",
        email: "daniel.costa@email.com",
        cpf: "456.789.012-34",
        createdAt: new Date("2024-01-18"),
        updatedAt: new Date("2024-01-25")
    },
    {
        name: "Eduarda Lima",
        email: "eduarda.lima@email.com",
        cpf: "567.890.123-45",
        createdAt: new Date("2024-01-19"),
        updatedAt: new Date("2024-01-19")
    },
    {
        name: "Felipe Rodrigues",
        email: "felipe.rodrigues@email.com",
        cpf: "678.901.234-56",
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-30")
    },
    {
        name: "Gabriela Ferreira",
        email: "gabriela.ferreira@email.com",
        cpf: "789.012.345-67",
        createdAt: new Date("2024-01-21"),
        updatedAt: new Date("2024-01-21")
    },
    {
        name: "Henrique Alves",
        email: "henrique.alves@email.com",
        cpf: "890.123.456-78",
        createdAt: new Date("2024-01-22"),
        updatedAt: new Date("2024-02-01")
    },
    {
        name: "Isabela Martins",
        email: "isabela.martins@email.com",
        cpf: "901.234.567-89",
        createdAt: new Date("2024-01-23"),
        updatedAt: new Date("2024-01-23")
    },
    {
        name: "João Pereira",
        email: "joao.pereira@email.com",
        cpf: "012.345.678-90",
        createdAt: new Date("2024-01-24"),
        updatedAt: new Date("2024-02-05")
    },
    {
        name: "Karina Souza",
        email: "karina.souza@email.com",
        cpf: "111.222.333-44",
        createdAt: new Date("2024-01-25"),
        updatedAt: new Date("2024-01-25")
    },
    {
        name: "Lucas Barbosa",
        email: "lucas.barbosa@email.com",
        cpf: "222.333.444-55",
        createdAt: new Date("2024-01-26"),
        updatedAt: new Date("2024-02-10")
    },
    {
        name: "Mariana Gomes",
        email: "mariana.gomes@email.com",
        cpf: "333.444.555-66",
        createdAt: new Date("2024-01-27"),
        updatedAt: new Date("2024-01-27")
    },
    {
        name: "Nicolas Ribeiro",
        email: "nicolas.ribeiro@email.com",
        cpf: "444.555.666-77",
        createdAt: new Date("2024-01-28"),
        updatedAt: new Date("2024-02-15")
    },
    {
        name: "Olivia Carvalho",
        email: "olivia.carvalho@email.com",
        cpf: "555.666.777-88",
        createdAt: new Date("2024-01-29"),
        updatedAt: new Date("2024-01-29")
    },
    {
        name: "Paulo Mendes",
        email: "paulo.mendes@email.com",
        cpf: "666.777.888-99",
        createdAt: new Date("2024-01-30"),
        updatedAt: new Date("2024-02-20")
    },
    {
        name: "Rafaela Dias",
        email: "rafaela.dias@email.com",
        cpf: "777.888.999-00",
        createdAt: new Date("2024-01-31"),
        updatedAt: new Date("2024-01-31")
    },
    {
        name: "Sergio Henrique",
        email: "sergio.henrique@email.com",
        cpf: "888.999.000-11",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-25")
    },
    {
        name: "Tatiana Rocha",
        email: "tatiana.rocha@email.com",
        cpf: "999.000.111-22",
        createdAt: new Date("2024-02-02"),
        updatedAt: new Date("2024-02-02")
    },
    {
        name: "Vinicius Araújo",
        email: "vinicius.araujo@email.com",
        cpf: "000.111.222-33",
        createdAt: new Date("2024-02-03"),
        updatedAt: new Date("2024-03-01")
    }
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
