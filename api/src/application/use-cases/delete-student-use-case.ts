import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { StudentNotFoundError } from "@/domain/errors/student-not-found-error.ts";

export class DeleteStudentUseCase {
    constructor(private readonly studentRepository: StudentRepository) {}
    
    async execute(id: number): Promise<void> {


        const students = await this.studentRepository.list({id});


        if (students.length === 0) {
            throw new StudentNotFoundError(id);
        }

        await this.studentRepository.delete(id);
    }
}
    