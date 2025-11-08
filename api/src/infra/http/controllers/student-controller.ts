
import { Request, Response } from "express";
import { CreateStudentUseCase } from "@/application/use-cases/create-student-use-case.ts";
import { ListStudentsUseCase } from "@/application/use-cases/list-students-use-case.ts";

export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly listStudentsUseCase: ListStudentsUseCase,
    ) {}

    async handleRegisterStudent(req: Request, res: Response) {

        const { name, email, cpf } = req.body;

        try {
            const student = await this.createStudentUseCase.execute({ name, email, cpf });
            return res.status(201).json(student);
        } catch (error) {
            return res.status(500).json({ error: error as string });
        }

        
    }

    async handleListStudents(req: Request, res: Response) {
        const { query } = req;
        try {
            const students = await this.listStudentsUseCase.execute(query);
            return res.status(200).json(students);
        } catch (error) {
            return res.status(500).json({ error: error as string });
        }
    }
}
