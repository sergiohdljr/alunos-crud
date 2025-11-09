import { StudentRepository } from '@/application/repositories/student-repository-interface.ts'
import { Student } from '@/domain/entities/student.ts'
import { StudentEmailAlreadyExistsError } from '@/domain/errors/student-email-already-exists-error.ts'
import { StudentCpfAlreadyExistsError } from '@/domain/errors/student-cpf-already-exists-error.ts'

export class CreateStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(student: Student): Promise<Record<string, number>> {
    const existingByEmail = await this.studentRepository.list({
      email: student.email,
    })
    if (existingByEmail.length > 0) {
      throw new StudentEmailAlreadyExistsError(student.email)
    }

    const existingByCpf = await this.studentRepository.list({
      cpf: student.cpf,
    })
    if (existingByCpf.length > 0) {
      throw new StudentCpfAlreadyExistsError(student.cpf)
    }

    return this.studentRepository.create(student)
  }
}
