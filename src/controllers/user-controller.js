
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
  
    // GLÖM EJ GÖRA ASYNC

    async newUser (req, res) {
    try {
      console.log('register user')
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
    // save in database
      await user.save()

      req.session.flash = {
        type: 'success', text: 'You have been registered, please log in'
      }
      res.redirect('../login/log-in')
    } catch (error) {
      console.log(error.errors)
      req.session.flash = {
        type: 'danger', text: 'YOU DID SOMETHING WRONG, NOT MY PROBLEM'
      }
      res.redirect('../login/register')
    }
  }

    logout (req, res) {
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
      console.log('check if user is owner')

      /*if (req.session.username === undefined) {
        return next(createHttpError(404))
      }*/

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
      res.redirect('../log-in')
      //fixa felmeddelande
    }
  }

  userHome (req, res, next) {
    res.render('login/user-home')
  }

  async userSnippets (req, res, next) {
    try {
      if (req.session.username) {
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
      } else {
        console.log('no user logged in')
        res.redirect('log-in')
      }
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
