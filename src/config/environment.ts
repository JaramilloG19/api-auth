export const API_URL = (process.env.API_URL_PROTOCOL as string) + (process.env.API_URL_BASE as string) ?? ''
export const API_TOKEN = process.env.API_TOKEN_BUBBLE as string ?? ''
