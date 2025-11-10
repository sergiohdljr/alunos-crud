import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query)
      req.validatedQuery = validatedQuery
      next()
    } catch (error) {
      next(error)
    }
  }
}

export function validateParams<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params)
      req.validatedParams = validatedParams
      next()
    } catch (error) {
      next(error)
    }
  }
}
