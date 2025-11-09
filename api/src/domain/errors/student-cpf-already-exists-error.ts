import { BaseError } from './base-error.ts'

export class StudentCpfAlreadyExistsError extends BaseError {
  constructor(cpf: string) {
    super(`Student with cpf ${cpf} already exists`, 409)
  }
}
