/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getUserById, getUsers } from '../controllers/user.c'
const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

module.exports = router
