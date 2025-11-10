import { Router } from 'express'
import { StudentController } from '@/infra/http/controllers/student-controller.ts'
import { validateBody, validateQuery, validateParams } from '@/infra/http/middlewares/validation.ts'
import { 
  createStudentSchema, 
  updateStudentSchema, 
  listStudentsQuerySchema, 
  studentIdSchema 
} from '@/infra/http/types/student-schemas.ts'

export function studentRoutes(controller: StudentController) {
  const router = Router()

  router.post('/students', 
    validateBody(createStudentSchema),
    (req, res, next) => controller.handleRegisterStudent(req, res, next)
  )
  
  router.get('/students', 
    validateQuery(listStudentsQuerySchema),
    (req, res, next) => controller.handleListStudents(req, res, next)
  )
  
  router.delete('/students/:id', 
    validateParams(studentIdSchema),
    (req, res, next) => controller.handleDeleteStudent(req, res, next)
  )
  
  router.put('/students/:id', 
    validateParams(studentIdSchema),
    validateBody(updateStudentSchema),
    (req, res, next) => controller.handleUpdateStudent(req, res, next)
  )

  return router
}
