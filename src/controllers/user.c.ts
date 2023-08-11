import { type Request, type Response } from 'express'
import { responseSuccess, responseError } from '../utils/response'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const responseUser = await fetch('https://dummyjson.com/users')
      .then(async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Error')
        }
      })

    await responseSuccess(res, 'Get user success', responseUser, 200)
  } catch (error) {
    await responseError(res, 'Get user failed', error)
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    console.log(userId)
    const responseUser = await fetch(`https://dummyjson.com/users/${userId}`)
      .then(async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Error')
        }
      })

    await responseSuccess(res, 'Get user by ID success', responseUser, 200)
  } catch (error) {
    await responseError(res, 'Get user by ID failed', error)
  }
}
