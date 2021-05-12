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

  newUser (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    // save in database
    user.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('saved')
      }
    })
    req.session.flash = {
      type: 'success', text: 'You have been registered, please log in'
    }
    res.redirect('log-in')
  }
}
