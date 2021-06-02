import express from 'express'
import { CrudController } from '../controllers/crud-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const crudController = new CrudController()
const userController = new UserController()

// create form to write in, CRUD
router.get('/create', (req, res, next) => crudController.create(req, res, next))

// all documents, CRUD
router.get('/read', (req, res, next) => crudController.read(req, res, next))

// post a created snippet,CRUD
router.post('/create-new', (req, res, next) => crudController.createSnippet)

// logs out/destroys session, USER
router.post('/logout', (req, res, next) => userController.logout(req, res, next))

// deletes a snippet, CRUD
router.post('/:id/delete', (req, res, next) => crudController.delete(req, res, next))

// render the edit page, CRUD
router.get('/:id/edit', (req, res, next) => crudController.edit(req, res, next))

// posts the update after edit, CRUD
router.post('/:id/update', (req, res, next) => crudController.update(req, res, next))

// renders a specific snippet, CRUD
router.get('/:id', (req, res, next) => crudController.getSnippetById(req, res, next))

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