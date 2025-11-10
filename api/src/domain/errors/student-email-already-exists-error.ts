import { BaseError } from './base-error.ts'

export class StudentEmailAlreadyExistsError extends BaseError {
  constructor(email: string) {
    super(`Aluno com email ${email} já existe`, 409)
  }
}
