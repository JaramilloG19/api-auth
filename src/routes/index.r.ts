/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from 'fs'
import express from 'express'
import { removeExtension } from '../utils/files'
const PATH_ROUTES = __dirname
const router = express.Router()

fs.readdirSync(PATH_ROUTES).filter(async (file): Promise<void> => {
  const nameRouter = removeExtension(file)
  nameRouter !== 'index' && router.use(`/${nameRouter}`, require(`./${file}`))
})

export default router
