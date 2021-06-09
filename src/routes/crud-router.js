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
