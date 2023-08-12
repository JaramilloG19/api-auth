import { type Response } from 'express'
import { CustomError } from './customError'

export const responseError = async (
  res: Response,
  message: string,
  error: any,
  status: number = 500
): Promise<void> => {
  if (error instanceof CustomError) {
    status = error.status ?? status
  }
  res.status(status)
  res.json({
    status: false,
    message,
    error,
    statusCode: status
  })
}

export const responseSuccess = async (
  res: Response,
  message: string,
  data: Record<string, any>,
  status: number = 200
): Promise<void> => {
  res.status(status)
  res.json({
    status: true,
    message,
    data,
    statusCode: status
  })
}
