import request from 'supertest'
import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts'
import { CreateStudentUseCase } from '@/application/use-cases/create-student-use-case.ts'
import { ListStudentsUseCase } from '@/application/use-cases/list-students-use-case.ts'
import { DeleteStudentUseCase } from '@/application/use-cases/delete-student-use-case.ts'
import { UpdateStudentUseCase } from '@/application/use-cases/update-student-use-case.ts'
import { StudentController } from '@/infra/http/controllers/student-controller.ts'
import express from 'express'

function createTestApp() {
  const repository = new InMemoryRepository()

  const controller = new StudentController(
    new CreateStudentUseCase(repository),
    new ListStudentsUseCase(repository),
    new DeleteStudentUseCase(repository),
    new UpdateStudentUseCase(repository),
  )

  const router = express.Router()

  router.post('/', controller.handleRegisterStudent.bind(controller))
  router.get('/', controller.handleListStudents.bind(controller))
  router.delete('/:id', controller.handleDeleteStudent.bind(controller))
  router.put('/:id', controller.handleUpdateStudent.bind(controller))

  const app = express()
  app.use(express.json())
  app.use('/students', router)

  return { app, repository }
}

describe('Endpoints de Alunos (Integração)', () => {
  let app: express.Express

  beforeEach(() => {
    const testEnv = createTestApp()
    app = testEnv.app
  })

  it('Deve criar um aluno (POST /students)', async () => {
    const response = await request(app)
      .post('/students')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    )
  })


  it('Deve listar alunos (GET /students)', async () => {
    await request(app).post('/students').send({
      name: 'Jane Doe',
      email: 'jane@example.com',
      cpf: '99999999999',
    })

    const response = await request(app).get('/students')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body[0]).toHaveProperty('name', 'Jane Doe')
  })

  it('Deve atualizar um aluno (PUT /students/:id)', async () => {
    const createRes = await request(app)
      .post('/students')
      .send({
        name: 'Old Name',
        email: 'old@example.com',
        cpf: '11111111111',
      })

    const id = createRes.body.id

    const updateRes = await request(app)
      .put(`/students/${id}`)
      .send({
        name: 'New Name',
        email: 'new@example.com',
        cpf: '11111111111',
      })

    expect(updateRes.status).toBe(200)
    expect(updateRes.body).toEqual(
      expect.objectContaining({
        id,
        name: 'New Name',
        email: 'new@example.com',
      }),
    )
  })

  it('Deve deletar um aluno (DELETE /students/:id)', async () => {
    const createRes = await request(app)
      .post('/students')
      .send({
        name: 'To Delete',
        email: 'delete@example.com',
        cpf: '22222222222',
      })

    const id = createRes.body.id

    const deleteRes = await request(app).delete(`/students/${id}`)

    expect(deleteRes.status).toBe(204)
  })
})
