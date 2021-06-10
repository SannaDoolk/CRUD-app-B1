/**
 * Module for the user-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { User } from '../models/user.js'
import { CodeSnippet } from '../models/codeSnippet.js'
import createHttpError from 'http-errors'

/**
 *
 */
export class UserController {
  /**
   * .
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */

  /**
   * Creates and saves a new user to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async newUser (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })

      await user.save()

      req.session.flash = {
        type: 'success', text: 'You have been registered, please log in'
      }
      res.redirect('../login/log-in')
    } catch (error) {
      if (error.code === 11000) {
        req.session.flash = {
          type: 'danger', text: 'Username already taken'
        }
      }
      if (error.name === 'ValidationError') {
        const errors = []
        for (const key in error.errors) {
          errors.push(error.errors[key].message)
        }
        res.render('login/register', {
          validationErrors: errors
        })
      } else {
        res.redirect('../login/register')
      }
    }
  }

  /**
   * Checks if a user is logged in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} 404 error.
   */
  async isLoggedIn (req, res, next) {
    console.log('checked if user is logged in')
    if (!req.session.username) {
      return next(createHttpError(404), 'Page not found')
    }
    next()
  }

  /**
   * Checks if a user is the owener of a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} 403 error.
   */
  async isUserOwner (req, res, next) {
    console.log('checked if user is owner')

    const codeSnippet = await CodeSnippet.findOne({ _id: req.params.id })
    if (req.session.username !== codeSnippet.owner) {
      return next(createHttpError(403))
    }
    next()
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async authenticate (req, res) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username

        res.redirect('../login/user-home')
      })
    } catch (error) {
      req.session.flash = {
        type: 'danger', text: 'Incorrect username or password'
      }
      res.redirect('./log-in')
    }
  }

  /**
   * Renders a users user page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  userHome (req, res) {
    const username = {
      username: req.session.username
    }
    res.render('login/user-home', { username })
  }

  /**
   * Renders a users code snippets page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async userSnippets (req, res) {
    try {
      const user = req.session.username
      const viewData = {
        codeSnippets: (await CodeSnippet.find({ owner: user })).map(codeSnippet => ({
          title: codeSnippet.title,
          id: codeSnippet._id,
          description: codeSnippet.description,
          owner: codeSnippet.owner
        }))
      }
      res.render('login/user-snippets', { viewData })
    } catch (error) {
      res.redirect('..')
    }
  }

  /**
   * Renders the log in page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  logInPage (req, res) {
    res.render('login/log-in')
  }

  /**
   * Renders the register page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  registerPage (req, res) {
    res.render('login/register')
  }

  /**
   * Log out user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  logout (req, res) {
    req.session.destroy()
    res.redirect('..')
  }
}
