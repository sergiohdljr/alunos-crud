import { StudentRepository } from '../repositories/student-repository-interface.ts'
import { Student } from '@/domain/entities/student.ts'

export class ListStudentsUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(student: Partial<Student>): Promise<Student[]> {
    const students = await this.studentRepository.list(student)
    return students
  }
}
