import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { Student } from "@/domain/entities/student.ts";

export class CreateStudentUseCase {
    constructor(private readonly studentRepository: StudentRepository) {}
    
    async execute(student: Student): Promise<Record<string, number>> {
        const existingByEmail = await this.studentRepository.list({
            email: student.email
        });
        if (existingByEmail.length > 0) {
            throw new Error("Student already exists");
        }

        const existingByCpf = await this.studentRepository.list({
            cpf: student.cpf
        });
        if (existingByCpf.length > 0) {
            throw new Error("Student already exists");
        }

        return this.studentRepository.create(student);
    }
}