
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
      } else {
        req.session.flash = {
          type: 'danger', text: error.message
        }
      }
      res.redirect('../login/register')
    }
  }

    logout (req, res) {
    console.log('logged out')
    req.session.destroy()
    res.redirect('..')
  }

  async isLoggedIn (req, res, next) {
    console.log('checked if user is logged in')
    if (!req.session.username) {
      return next(createHttpError(404), 'Page not found')
    }
    next()
  }

  async isUserOwner (req, res, next) {
    try {
      console.log('checked if user is owner')

      const codeSnippet = await CodeSnippet.findOne({ _id: req.params.id })
      if (req.session.username !== codeSnippet.owner) {
        return next(createHttpError(403))
      }
      next()
    } catch (error) {

    }
  }

 // Kollar om username och password matchar och genererar session cookie
  async authenticate (req, res, next) {
    try {
      console.log('auth')
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username

        res.redirect('../login/user-home')
      })
    } catch (error) {
      console.log('ERRRO IN AUTH')
      req.session.flash = {
        type: 'danger', text: 'Login attempt failed'
      }
      res.redirect('./log-in')
    }
  }

  userHome (req, res, next) {
    const username = {
      username: req.session.username
    }
    res.render('login/user-home', { username })
  }

  async userSnippets (req, res, next) {
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

    }
  }

  // Visa login-sida
    logInPage (req, res) {
    res.render('login/log-in')
  }

  // Visa register-sida
    registerPage (req, res) {
    res.render('login/register')
  }
}
