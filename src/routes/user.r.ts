/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getUser } from '../controllers/user.c'
const router = express.Router()

router.get('/', getUser)

module.exports = router
