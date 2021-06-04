import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const userController = new UserController()

// render login page, for everyone
router.get('/log-in', userController.logInPage)

// render register page, for everyone
router.get('/register', userController.registerPage)

// logs out/destroys session, for logged in
router.post('/logout', userController.isLoggedIn, userController.logout)

// post users log-in-form, for everyone
router.post('/login-user', userController.authenticate)

// render users snippets, for logged in
router.get('/user-snippets', userController.isLoggedIn, userController.userSnippets)

// posts users registration-form, USER
router.post('/new-register', userController.newUser)

// render users home page, USER
router.get('/user-home', userController.isLoggedIn, userController.userHome)
