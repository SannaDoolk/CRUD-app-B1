
import { User } from '../models/user.js'
import { CodeSnippet } from '../models/codeSnippet.js'

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
      res.redirect('../register', {
        validationErrors: [error.errors.message]

      //fixa felmeddelande
      })
    }
  }

    logout (req, res) {
    req.session.destroy()
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
      console.log('auth')
      const user = await User.authenticate(req.body.username, req.body.password)
      console.log('auth 2')
      req.session.regenerate(() => {
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username

        res.redirect('user-home')
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
}
