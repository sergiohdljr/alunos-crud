import type { Request, Response, NextFunction } from 'express'
import { BaseError } from '@/domain/errors/base-error.ts'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err)

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      details: err.details,
    })
  }

  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Something went wrong',
  })
}
