import { NextFunction, Request, Response } from 'express'
import { CreateStudentUseCase } from '@/application/use-cases/create-student-use-case.ts'
import { ListStudentsUseCase } from '@/application/use-cases/list-students-use-case.ts'
import { DeleteStudentUseCase } from '@/application/use-cases/delete-student-use-case.ts'
import { UpdateStudentUseCase } from '@/application/use-cases/update-student-use-case.ts'

export class StudentController {
  constructor(
    private readonly createStudentUseCase: CreateStudentUseCase,
    private readonly listStudentsUseCase: ListStudentsUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
    private readonly updateStudentUseCase: UpdateStudentUseCase,
  ) {}

  async handleRegisterStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, cpf } = req.body

      const student = await this.createStudentUseCase.execute({
        name,
        email,
        cpf,
      })
      return res.status(201).json(student)
    } catch (error) {
      next(error)
    }
  }

  async handleListStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.validatedQuery || {}
      const students = await this.listStudentsUseCase.execute(query)
      return res.status(200).json(students)
    } catch (error) {
      next(error)
    }
  }

  async handleDeleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.validatedParams || req.params
      await this.deleteStudentUseCase.execute(Number(id))
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async handleUpdateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.validatedParams || req.params
      const { name, email, cpf } = req.body
      
      const student = await this.updateStudentUseCase.execute(Number(id), {
        name,
        email,
        cpf,
      })
      return res.status(200).json(student)
    } catch (error) {
      next(error)
    }
  }
}
