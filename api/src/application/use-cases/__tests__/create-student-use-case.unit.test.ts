import { CreateStudentUseCase } from '@/application/use-cases/create-student-use-case.ts'
import { InMemoryRepository } from '@/infra/repositories/in-memory-repository.ts'
import { Student } from '@/domain/entities/student.ts'
import { StudentEmailAlreadyExistsError } from '@/domain/errors/student-email-already-exists-error.ts'
import { StudentCpfAlreadyExistsError } from '@/domain/errors/student-cpf-already-exists-error.ts'
import { describe, expect, beforeEach } from '@jest/globals'

describe('CreateStudentUseCase', () => {
  let studentRepository: InMemoryRepository
  let createStudent: CreateStudentUseCase
  let mockStudent: Student

  beforeEach(() => {
    studentRepository = new InMemoryRepository()
    createStudent = new CreateStudentUseCase(studentRepository)
    mockStudent = new Student('John Doe', 'john.doe@example.com', '12345678901')
  })

  test('should create a student', async () => {
    const student = await createStudent.execute(mockStudent)

    expect(student).toHaveProperty('id')
  })

  test('should throw an error if a student with the same email already exists', async () => {
    await createStudent.execute(mockStudent)

    await expect(
      createStudent.execute({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        cpf: '98765432100',
      }),
    ).rejects.toThrow(StudentEmailAlreadyExistsError)
  })

  test('should throw an error if a student with the same cpf already exists', async () => {
    await createStudent.execute(mockStudent)

    await expect(
      createStudent.execute({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        cpf: '12345678901',
      }),
    ).rejects.toThrow(StudentCpfAlreadyExistsError)
  })
})
