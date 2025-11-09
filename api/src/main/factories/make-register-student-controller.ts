import { CreateStudentUseCase } from "@/application/use-cases/create-student-use-case.ts";
import { db } from "@/infra/db/client.ts";
import { StudentController } from "@/infra/http/controllers/student-controller.ts";
import { DrizzleRepository } from "@/infra/repositories/drizzle-repository.ts";
import { ListStudentsUseCase } from "@/application/use-cases/list-students-use-case.ts";
import { DeleteStudentUseCase } from "@/application/use-cases/delete-student-use-case.ts";

export function makeStudentController() {
    const repository = new DrizzleRepository(db);
    const createStudentUseCase = new CreateStudentUseCase(repository);
    const listStudentsUseCase = new ListStudentsUseCase(repository);
    const deleteStudentUseCase = new DeleteStudentUseCase(repository);
    const studentController = new StudentController(createStudentUseCase, listStudentsUseCase, deleteStudentUseCase);
    
    return studentController;
}
