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

  test('deve criar um aluno', async () => {
    const student = await createStudent.execute(mockStudent)

    expect(student).toHaveProperty('id')
  })

  test('deve lançar um erro se um aluno com o mesmo email já existir', async () => {
    await createStudent.execute(mockStudent)

    await expect(
      createStudent.execute({
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        cpf: '98765432100',
      }),
    ).rejects.toThrow(StudentEmailAlreadyExistsError)
  })

  test('deve lançar um erro se um aluno com o mesmo cpf já existir', async () => {
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
