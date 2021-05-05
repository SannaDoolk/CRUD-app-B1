import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'

export const router = express.Router()

const controller = new CrudController()

router.get('/', controller.index)
router.get('/log-in', controller.logIn)
router.get('/register', controller.register)
router.get('/create-new', controller.createNew)
router.get('/read', controller.read)
router.get('/update', controller.update)
router.get('/delete', controller.delete)
