/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAll, getById, getFilter } from '../controllers/get.c'
const router = express.Router()

router.get('/', getAll)
router.get('/by-id', getById)
router.get('/filter', getFilter)

module.exports = router
