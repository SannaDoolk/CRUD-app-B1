import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const crudController = new CrudController()
const userController = new UserController()

router.get('/', crudController.index)
router.get('/log-in', crudController.logInPage) // login page
//router.post('/user-page', crudController.authenticate)
router.get('/register', crudController.registerPage) // register page
//router.post('/new-register', crudController.newUser)
router.get('/create', crudController.create)
router.get('/read', crudController.read)
router.get('/update', crudController.update)
router.get('/delete', crudController.delete)
router.post('/create-new', crudController.createSnippet)

router.post('/logout', userController.logout)
router.get('/user-page', userController.authorize, userController.userPage)
router.post('/user-page', userController.authenticate)
router.post('/new-register', userController.newUser)
