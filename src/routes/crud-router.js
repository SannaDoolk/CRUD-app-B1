import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'

export const router = express.Router()

const controller = new CrudController()

router.get('/', controller.index)
