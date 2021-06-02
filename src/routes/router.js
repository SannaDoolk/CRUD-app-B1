/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { router as crudRouter } from './crud-router.js'
import { router as homeRouter } from './home-router.js'
import { router as userRouter } from './user-router.js'
import createError from 'http-errors'

export const router = express.Router()

//router.use('/', crudRouter)

router.use('/', homeRouter)

router.use('/crud', crudRouter)

router.use('/login', userRouter)

router.use('*', (req, res, next) => next(createError(404)))
