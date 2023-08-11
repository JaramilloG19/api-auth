import { API_URL } from '../config/environment'
import { type Request, type Response } from 'express'
import { responseSuccess, responseError } from '../utils/response'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const endpoint = req.query.endpoint as string

    // Check if endpoint is provided
    if (typeof req.query.endpoint === 'undefined' || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400)
      return
    }

    const response = await fetch(`${API_URL}${endpoint}`).then(
      async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Error')
        }
      }
    )
    await responseSuccess(res, `Get all ${endpoint} success`, response, 200)
    return
  } catch (error) {
    await responseError(res, `Get all ${req.query.endpoint as string} failed`, error)
  }
}

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string
    const endpoint = req.query.endpoint as string

    // Check if endpoint is provided
    if (typeof req.query.endpoint === 'undefined' || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400) // Bad request
      return
    }

    // Check if id is provided
    if (typeof req.query.id === 'undefined' || req.query.id === '') {
      await responseError(res, 'Id not found', null, 400) // Bad request
      return
    }

    const response = await fetch(`${API_URL}${endpoint}/${id}`).then(
      async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Error')
        }
      }
    )
    await responseSuccess(res, `Get by id ${endpoint} success`, response, 200)
    return
  } catch (error) {
    await responseError(res, `Get by id ${req.query.endpoint as string} failed`, error)
  }
}

export const getFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const endpoint = req.query.endpoint as string
    const filters = req.query.filter as Record<string, string>

    // Check if endpoint is provided
    if (typeof req.query.endpoint === 'undefined' || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400) // Bad request
      return
    }

    // Check if filter is provided
    if (typeof req.query.filter === 'undefined' || req.query.filter === '') {
      await responseError(res, 'No filters provided', null, 400) // Bad request
      return
    }

    // Check if filter is an object not multiple
    if (Object.keys(filters).length !== 1) {
      await responseError(res, 'A single filter must be provided', null, 400) // Bad request
      return
    }

    const [key, value] = Object.entries(filters)[0] // Destructure filter object to get key and value
    const filter = `filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}` // Encode key and value to URI

    const response = await fetch(`${API_URL}${endpoint}/${filter}`).then(
      async (response) => {
        if (response.ok) {
          return await response.json()
        } else {
          throw new Error('Error')
        }
      }
    )

    await responseSuccess(res, `Filtered data from ${endpoint} success`, response, 200)
    return
  } catch (error) {
    await responseError(res, `Failed to filter data from ${req.query.endpoint as string}`, error)
  }
}
