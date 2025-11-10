import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts'
import { UpdateStudentUseCase } from '@/application/use-cases/update-student-use-case.ts'
import { Student } from '@/domain/entities/student.ts'
import { StudentEmailAlreadyExistsError } from '@/domain/errors/student-email-already-exists-error.ts'
import { StudentCpfAlreadyExistsError } from '@/domain/errors/student-cpf-already-exists-error.ts'

describe('UpdateStudentUseCase', () => {
  let studentRepository: InMemoryRepository
  let updateStudent: UpdateStudentUseCase
  let mockStudent: Student
  const mockFalseId = 999

  beforeEach(async () => {
    studentRepository = new InMemoryRepository()
    updateStudent = new UpdateStudentUseCase(studentRepository)
    mockStudent = new Student('John Doe', 'john.doe@example.com', '12345678901')
    const { id } = await studentRepository.create(mockStudent)
    mockStudent.id = id
  })

  test('Deve atualizar um aluno', async () => {
    const updatedStudent = await updateStudent.execute(mockStudent.id!, {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
    })
    expect(updatedStudent).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      id: mockStudent.id,
    })
  })

  test('Deve lançar um erro se o aluno não for encontrado', async () => {
    await expect(
      updateStudent.execute(mockFalseId, {
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678901',
      }),
    ).rejects.toThrow(`Aluno com ID ${mockFalseId} não encontrado`)
  })

  test('Deve lançar um erro se o email do aluno já existir e o id for diferente', async () => {
    const mockStudent2 = new Student(
      'Jane Doe',
      'jane.doe@example.com',
      '98765432100',
    )
    const { id } = await studentRepository.create(mockStudent2)
    mockStudent2.id = id
    await expect(
      updateStudent.execute(mockStudent2.id!, {
        name: 'Jane Doe Updated',
        email: 'john.doe@example.com',
        cpf: '98765432100',
      }),
    ).rejects.toThrow(StudentEmailAlreadyExistsError)
  })

  test('Deve lançar um erro se o cpf do aluno já existir e o id for diferente', async () => {
    const mockStudent2 = new Student(
      'Jane Doe',
      'jane.doe@example.com',
      '98765432100',
    )
    const { id } = await studentRepository.create(mockStudent2)
    mockStudent2.id = id
    await expect(
      updateStudent.execute(mockStudent2.id!, {
        name: 'Jane Doe Updated',
        email: 'jane.doe@example.com',
        cpf: '12345678901',
      }),
    ).rejects.toThrow(StudentCpfAlreadyExistsError)
  })
})
