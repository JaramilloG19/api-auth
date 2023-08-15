import { type Endpoint } from '../types/endpoint'
import { type Request, type Response } from 'express'
import { EndpointService } from '../services/endpoint.s'
import { responseSuccess, responseError } from '../utils/response'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const endpoint = req.query.endpoint as string
    const { limit, skip } = req.query
    const endpointService = new EndpointService(endpoint as Endpoint, { limit, skip })

    // Check if endpoint is provided
    if (req.query.endpoint === undefined || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400)
      return
    }
    const response = await endpointService.getAll()
    await responseSuccess(res, `Get all ${endpoint} success`, response, 200)
    return
  } catch (error: any) {
    const endpoint = req.query.endpoint as string
    await responseError(res, `Get all ${endpoint} error`, error?.message, error?.status)
  }
}

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string
    const endpoint = req.query.endpoint as string
    const endpointService = new EndpointService(endpoint as Endpoint)

    // Check if endpoint is provided
    if (req.query.endpoint === undefined || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400) // Bad request
      return
    }

    // Check if id is provided
    if (req.query.id === undefined || req.query.id === '') {
      await responseError(res, 'Id not found', null, 400) // Bad request
      return
    }

    const response = await endpointService.getById(id)
    await responseSuccess(res, `Get by id ${endpoint} success`, response, 200)
    return
  } catch (error: any) {
    const endpoint = req.query.endpoint as string
    await responseError(res, `Get by id ${endpoint} error`, error?.message, error?.status)
  }
}

export const getFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const endpoint = req.query.endpoint as string
    const { limit, skip } = req.query
    const filters = req.query.filter as Record<string, string>
    const endpointService = new EndpointService(endpoint as Endpoint, { limit, skip })

    // Check if endpoint is provided
    if (req.query.endpoint === undefined || req.query.endpoint === '') {
      await responseError(res, 'Endpoint not found', null, 400) // Bad request
      return
    }

    // Check if filter is provided
    if (req.query.filter === undefined || req.query.filter === '') {
      await responseError(res, 'No filters provided', null, 400) // Bad request
      return
    }

    const response = await endpointService.getFilter(filters)
    await responseSuccess(res, `Filtered data from ${endpoint} success`, response, 200)
    return
  } catch (error: any) {
    const endpoint = req.query.endpoint as string
    await responseError(res, `Filtered data from ${endpoint} error`, error?.message, error?.status)
  }
}
