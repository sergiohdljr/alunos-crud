import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts'
import { UpdateStudentUseCase } from '@/application/use-cases/update-student-use-case.ts'
import { Student } from '@/domain/entities/student.ts'

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

  test('should update a student', async () => {
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

  test('should throw an error if student is not found', async () => {
    await expect(
      updateStudent.execute(mockFalseId, {
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678901',
      }),
    ).rejects.toThrow(`Student with id ${mockFalseId} not found`)
  })

  test('should throw an error if student email already exists and student id is different', async () => {
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
    ).rejects.toThrow(`Student with email john.doe@example.com already exists`)
  })

  test('should throw an error if student cpf already exists and student id is different', async () => {
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
    ).rejects.toThrow(`Student with cpf 12345678901 already exists`)
  })
})
