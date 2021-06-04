import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const crudController = new CrudController()
const userController = new UserController()

// render form for create, only for logged in
router.get('/create', userController.isLoggedIn, crudController.create)

// all documents, for everyone
router.get('/read', crudController.read)

// post a created snippet, for logged in users
router.post('/create-new', userController.isLoggedIn, crudController.createSnippet)

// deletes a snippet, check if user is owner, CRUD
router.post('/:id/delete', userController.isLoggedIn, userController.isUserOwner, crudController.delete)

// render the edit page, only if user is owner, CRUD
router.get('/:id/edit', userController.isLoggedIn, userController.isUserOwner, crudController.edit)

// posts the update after edit, CRUD
router.post('/:id/update', userController.isLoggedIn, userController.isUserOwner, crudController.update)

// renders a specific snippet, for everyone, CRUD
router.get('/:id', crudController.getSnippetById)





// post users log-in-form, USER
//router.post('/login-user', (req, res, next) => userController.authenticate(req, res, next))

// render users snippets, USER
//router.get('/user-snippets', (req, res, next) => userController.userSnippets(req, res, next))

// posts users registration-form, USER
//router.post('/new-register', (req, res, next) => userController.newUser(req, res, next))

// render users home page, USER
//router.get('/user-home', (req, res, next) => userController.userHome(req, res, next))

//router.get('/', crudController.index) // render home page

// render login page
//router.get('/log-in', (req, res, next) => crudController.logInPage(req, res, next))

// render register page
//router.get('/register', (req, res, next) => crudController.registerPage(req, res, next))