import { DeleteStudentUseCase } from '@/application/use-cases/delete-student-use-case.ts'
import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts'
import { Student } from '@/domain/entities/student.ts'
import { StudentNotFoundError } from '@/domain/errors/student-not-found-error.ts'

describe('DeleteStudentUseCase', () => {
  let studentRepository: InMemoryRepository
  let deleteStudent: DeleteStudentUseCase
  let mockStudent: Student
  const mockFalseId = 999

  beforeEach(async () => {
    studentRepository = new InMemoryRepository()
    deleteStudent = new DeleteStudentUseCase(studentRepository)
    mockStudent = new Student('John Doe', 'john.doe@example.com', '12345678901')
    const { id } = await studentRepository.create(mockStudent)
    mockStudent.id = id
  })

  test('Deve deletar um aluno', async () => {
    await deleteStudent.execute(mockStudent.id!)
    const student = await studentRepository.list({ id: mockStudent.id! })
    expect(student).toHaveLength(0)
  })

  test('Deve lançar um erro se o aluno não for encontrado', async () => {
    await expect(deleteStudent.execute(mockFalseId)).rejects.toThrow(
      StudentNotFoundError,
    )
  })
})
