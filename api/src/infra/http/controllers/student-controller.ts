
import { NextFunction, Request, Response } from "express";
import { CreateStudentUseCase } from "@/application/use-cases/create-student-use-case.ts";
import { ListStudentsUseCase } from "@/application/use-cases/list-students-use-case.ts";
import { DeleteStudentUseCase } from "@/application/use-cases/delete-student-use-case.ts";

export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly listStudentsUseCase: ListStudentsUseCase,
        private readonly deleteStudentUseCase: DeleteStudentUseCase,
    ) {}

    async handleRegisterStudent(req: Request, res: Response, next: NextFunction) {

        const { name, email, cpf } = req.body;

        try {
            const student = await this.createStudentUseCase.execute({ name, email, cpf });
            return res.status(201).json(student);
        } catch (error) {
            next(error);
        }

        
    }

    async handleListStudents(req: Request, res: Response, next: NextFunction) {
        const { query } = req;
        try {
            const students = await this.listStudentsUseCase.execute(query);
            return res.status(200).json(students);
        } catch (error) {
            next(error);
        }
    }

    async handleDeleteStudent(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            await this.deleteStudentUseCase.execute(Number(id));
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
