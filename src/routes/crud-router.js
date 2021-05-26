import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'

export const router = express.Router()

const controller = new CrudController()

router.get('/', controller.index)
router.get('/log-in', controller.logIn)
router.post('/user-page', controller.authenticate)
router.get('/register', controller.register)
router.post('/new-register', controller.newUser)
router.get('/create-new', controller.createNew)
router.get('/read', controller.read)
router.get('/update', controller.update)
router.get('/delete', controller.delete)
router.get('/user-page', controller.authorize, controller.userPage)
