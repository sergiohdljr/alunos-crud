import { BaseError } from './base-error.ts'

export class StudentNotFoundError extends BaseError {
  constructor(id: number) {
    super(`Aluno com ID ${id} não encontrado`, 404)
  }
}
