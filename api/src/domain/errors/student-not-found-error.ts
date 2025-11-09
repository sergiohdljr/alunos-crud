import { BaseError } from './base-error.ts'

export class StudentNotFoundError extends BaseError {
  constructor(id: number) {
    super(`Student with id ${id} not found`, 404)
  }
}
