import fs from 'fs'
import express from 'express'
import { removeExtension } from '../utils/files'
const PATH_ROUTES = __dirname
const router = express.Router()

fs.readdirSync(PATH_ROUTES).filter(async (file): Promise<void> => {
  const nameRouter = removeExtension(file) // nameRouter = ['get', 'user', 'post', 'path', 'index']
  nameRouter !== 'index' && router.use(`/${nameRouter}`, await import(`./${file}`).then(mod => mod.default)) //
})

export default router
