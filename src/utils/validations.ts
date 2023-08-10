import { responseError } from './response'
import { type NextFunction, type Response, type Request } from 'express'
import { validationResult, type Result, type ValidationError } from 'express-validator'

const extractedErrors = async (errors: Result<ValidationError>): Promise<Record<string, any>> => {
  const validationErrors: Record<string, ValidationError> = errors.mapped()
  const filteredErrors = Object.fromEntries(
    Object.entries(validationErrors).map(([key, error]) => {
      if ('value' in error && 'msg' in error) {
        return [
          key,
          {
            value: error.value ?? '',
            message: error.msg
          }
        ]
      }
      return [key, {}]
    })
  )

  return filteredErrors
}

export const validateResult = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors: Result<ValidationError> = validationResult(req)
    if (errors.isEmpty()) { next(); return }
    await responseError(res, 'Validation Error', extractedErrors(errors), 403)
  } catch (error) {
    res.status(500).json('Server Error')
  }
}
