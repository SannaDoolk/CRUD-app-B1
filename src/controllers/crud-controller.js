/**
 * Module for the crud-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 *
 */
export class CrudController {
/**
 * .
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

  // GLÖM EJ GÖRA ASYNC

  // Visa home
  index (req, res) {
    res.render('home/index')
  }

  // Visa login-sida
  logIn (req, res) {
    res.render('login/log-in')
  }

  // Visa register-sida
  register (req, res) {
    res.render('register/register')
  }

  // Visa skapa-ny-sida
  createNew (req, res) {
    res.render('crud/create')
  }

  // Visa tillagt content
  read (req, res) {
    res.render('crud/read')
  }

  // Visa updatera-sida
  update (req, res) {
    res.render('crud/update')
  }

  // Visa delete-sida
  delete (req, res) {
    res.render('crud/delete')
  }

  async newUser (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      // save in database
      await user.save()

      req.session.flash = {
        type: 'success', text: 'You have been registered, please log in'
      }
      res.redirect('log-in')
    } catch (error) {
      res.render('register/register', {
        validationErrors: [error.errors.message]
        //fixa felmeddelande
      })
    }
  }

  async logInUser (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        req.session.loggedIn = true
        res.render('login/user-page') // render, redirect?
      })
    } catch (error) {
      res.render('login/log-in')
      //fixa felmeddelande
    }
  }

  userPage (req, res) {
    console.log('access')
      res.render('login/user')
  }

  authorize (req, res, next) {
    if (!req.session.loggedIn) {
      const error = new Error('Forbidden')
      error.statusCode = 403
      return next(error)
    }
    next()
  }
}
