import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const crudController = new CrudController()
const userController = new UserController()

router.get('/', crudController.index)
router.get('/log-in', crudController.logInPage) // login page
router.get('/register', crudController.registerPage) // register page
router.get('/create', userController.authorize, crudController.create)
router.get('/read', crudController.read)
router.get('/update', userController.authorize, crudController.update)
router.get('/delete', userController.authorize, crudController.delete)
router.post('/create-new', crudController.createSnippet) // authorize
router.get('/:id', crudController.getId)
router.post('/:id/delete', crudController.delete)

router.post('/logout', userController.logout)
router.get('/user-page', userController.authorize, userController.userPage)
router.post('/user-page', userController.authenticate)
router.post('/new-register', userController.newUser)
