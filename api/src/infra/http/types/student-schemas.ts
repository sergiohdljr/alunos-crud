import { z } from 'zod'

const cpfSchema = z.string()
  .min(1, 'CPF é obrigatório')
  .transform(val => val.replace(/[^0-9]/g, ''))
  .refine(val => val.length === 11, 'CPF deve conter exatamente 11 dígitos')
  .refine(val => /^[0-9]+$/.test(val), 'CPF deve conter apenas números')

const emailSchema = z.email()
  .min(1, 'Email é obrigatório')

const nameSchema = z.string()
  .min(1, 'Nome é obrigatório')
  .max(100, 'Nome deve ter no máximo 100 caracteres')
  .trim()

export const createStudentSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema
})

export const updateStudentSchema = createStudentSchema

export const listStudentsQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  cpf: z.string().optional()
})

export const studentIdSchema = z.object({
  id: z.string()
    .regex(/^[0-9]+$/, 'ID deve ser um número válido')
    .transform(val => Number(val))
})

export type CreateStudentRequest = z.infer<typeof createStudentSchema>
export type UpdateStudentRequest = z.infer<typeof updateStudentSchema>
export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>
export type StudentIdParams = z.infer<typeof studentIdSchema>
