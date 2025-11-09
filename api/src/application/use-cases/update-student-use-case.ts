import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { Student } from "@/domain/entities/student.ts";
import { StudentNotFoundError } from "@/domain/errors/student-not-found-error.ts";
import { StudentEmailAlreadyExistsError } from "@/domain/errors/student-email-already-exists-error.ts";
import { StudentCpfAlreadyExistsError } from "@/domain/errors/student-cpf-already-exists-error.ts";

export class UpdateStudentUseCase {
    constructor(private studentRepository: StudentRepository) {}

    async execute(id: number, student: Student): Promise<Student> {
        const existingStudent = await this.studentRepository.list({id});

        if (!existingStudent.length) {
            throw new StudentNotFoundError(id)
        }

        const existingByEmail = await this.studentRepository.list({
            email: student.email
        });
        if (existingByEmail.length > 0 && existingByEmail[0].id !== id) {
            throw new StudentEmailAlreadyExistsError(student.email);
        }

        const existingByCpf = await this.studentRepository.list({
            cpf: student.cpf
        });
        
        if (existingByCpf.length > 0 && existingByCpf[0].id !== id) {
            throw new StudentCpfAlreadyExistsError(student.cpf);
        }

        return await this.studentRepository.edit(id, student);
    }
}