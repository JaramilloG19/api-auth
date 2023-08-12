import { API_URL } from '../config/environment'
import { type Endpoint } from '../types/endpoint'
import { CustomError } from '../utils/customError'

export class EndpointService {
  private readonly endpoint: Endpoint

  constructor (endpoint: Endpoint) {
    this.endpoint = endpoint
  }

  public async getAll (): Promise<any> {
    try {
      const response = await fetch(`${API_URL}${this.endpoint}`).then(
        async (response) => {
          if (response.ok) {
            return await response.json()
          } else {
            throw new Error('Fetch get by id response not ok')
          }
        }
      )
      return response
    } catch (error) {
      console.log('🚀 ~ file: endpoint.s.ts:24 ~ EndpointService ~ getAll ~ error:', error)
      throw error
    }
  }

  public async getById (id: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}${this.endpoint}/${id}`).then(
        async (response) => {
          if (response.ok) {
            return await response.json()
          } else {
            throw new Error('Fetch get by id response not ok')
          }
        }
      )
      return response
    } catch (error) {
      console.log('🚀 ~ file: endpoint.s.ts:41 ~ EndpointService ~ getById ~ error:', error)
      throw error
    }
  }

  public async getFilter (filters: Record<string, string>): Promise<any> {
    try {
      // Check if filter is an object not multiple
      if (Object.keys(filters).length !== 1) {
        throw new CustomError('Filter must be an object with one key and one value', 400)
      }

      const [key, value] = Object.entries(filters)[0] // Destructure filter object to get key and value
      const filter = `filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}` // Encode key and value to URI

      const response = await fetch(`${API_URL}${this.endpoint}/${filter}`).then(
        async (response) => {
          if (response.ok) {
            return await response.json()
          } else {
            throw new Error('Fetch get by id response not ok')
          }
        }
      )
      return response
    } catch (error) {
      console.log('🚀 ~ file: endpoint.s.ts:66 ~ EndpointService ~ getFilter ~ error:', error)
      throw error
    }
  }
}
