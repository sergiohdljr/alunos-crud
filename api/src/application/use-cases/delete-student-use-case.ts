import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { StudentNotFoundError } from "@/domain/errors/student-not-found-error.ts";

export class DeleteStudentUseCase {
    constructor(private readonly studentRepository: StudentRepository) {}
    
    async execute(id: number): Promise<void> {

        const student = await this.studentRepository.list({id});

        if (!student) {
            throw new StudentNotFoundError(id);
        }

        await this.studentRepository.delete(id);
    }
}
    