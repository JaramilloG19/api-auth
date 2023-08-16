import { CustomError } from '../utils/customError'
import { API_URL, API_TOKEN } from '../config/environment'
import { type HttpHeaders, type Endpoint } from '../types/endpoint'

export class EndpointService {
  private readonly params: string
  private readonly endpoint: Endpoint
  private readonly headers: HttpHeaders

  constructor (endpoint: Endpoint, queryParams?: Record<string, any>, headers: HttpHeaders = {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }) {
    this.headers = headers
    this.endpoint = endpoint
    this.params = this.queryParams(queryParams)
  }

  private queryParams (params?: Record<string, any>): string {
    if (params === undefined) return ''
    const paramsArray = []
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) paramsArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    }
    return (paramsArray.length > 0) ? `?${paramsArray.join('&')}` : ''
  }

  public async getAll (): Promise<any> {
    try {
      console.log('🚀 ~ file: endpoint.s.ts:23 ~ EndpointService ~ getAll ~ this.params', `${API_URL}${this.endpoint}${this.params}`)
      const response = await fetch(`${API_URL}${this.endpoint}${this.params}`, {
        method: 'GET',
        headers: this.headers
      }).then(
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
      const response = await fetch(`${API_URL}${this.endpoint}/${id}`, {
        method: 'GET',
        headers: this.headers
      }).then(
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
      const filter = `filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`// Encode key and value to URI
      const params = filter.includes('?') ? this.params.replace('?', '&') : this.params // Replace the first '?' with '&' if filter already contains '?'.

      const response = await fetch(`${API_URL}${this.endpoint}/${filter}${params}`,
        {
          method: 'GET',
          headers: this.headers
        }
      ).then(
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
