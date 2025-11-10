import { BaseError } from './base-error.ts'

export class StudentEmailAlreadyExistsError extends BaseError {
  constructor(email: string) {
    super(`Estudante com email ${email} já existe`, 409)
  }
}
