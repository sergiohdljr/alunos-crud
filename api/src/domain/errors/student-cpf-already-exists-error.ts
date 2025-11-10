import { BaseError } from './base-error.ts'

export class StudentCpfAlreadyExistsError extends BaseError {
  constructor(cpf: string) {
    super(`Estudante com CPF ${cpf} já existe`, 409)
  }
}
