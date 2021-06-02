import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const userController = new UserController()

// render login page
router.get('/log-in', (req, res, next) => userController.logInPage(req, res, next))

// render register page
router.get('/register', (req, res, next) => userController.registerPage(req, res, next))

// logs out/destroys session, USER
router.post('/logout', (req, res, next) => userController.logout(req, res, next))

// post users log-in-form, USER
router.post('/login-user', (req, res, next) => userController.authenticate(req, res, next))

// render users snippets, USER
router.get('/user-snippets', (req, res, next) => userController.userSnippets(req, res, next))

// posts users registration-form, USER
router.post('/new-register', (req, res, next) => userController.newUser(req, res, next))

// render users home page, USER
router.get('/user-home', (req, res, next) => userController.userHome(req, res, next))

