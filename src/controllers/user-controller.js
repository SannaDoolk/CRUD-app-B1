
import { User } from '../models/user.js'

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

    userPage (req, res) {
    res.render('login/user-page')
  }

    logout (req, res) {
    console.log(req.session)
    req.session.destroy()
    console.log(req.session)
    res.redirect('/log-in')
  }

  authorize (req, res, next) {
    if (!req.session.loggedIn) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error) // fixa html
    }
    next()
  }

  async authenticate (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)

      req.session.regenerate(() => {
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username

        res.render('login/user-page') // render, redirect?
      })
    } catch (error) {
      res.render('login/log-in')
      //fixa felmeddelande
    }
  }
}
