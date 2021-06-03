/**
 * Module for the crud-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { User } from '../models/user.js'
import { CodeSnippet } from '../models/codeSnippet.js'

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
  /*async index (req, res, next) {
    try {
      const viewData = {
        codeSnippets: (await CodeSnippet.find({})).map(codeSnippet => ({
          title: codeSnippet.title,
          id: codeSnippet._id
        }))
      }
      res.render('home/index', { viewData })
    } catch (error) {
      res.redirect('..')
      console.log('error in index')
    }
  }*/

  // Visa login-sida
  logInPage (req, res) {
    res.render('login/log-in')
  }

  // Visa register-sida
  registerPage (req, res) {
    res.render('register/register')
  }

  // Visa skapa-ny-sida
  create (req, res) {
    console.log('in create')
    res.render('crud/create')
  }

  // Visa tillagt content
  async read (req, res, next) {
    try {
      const viewData = {
        codeSnippets: (await CodeSnippet.find({})).map(codeSnippet => ({
          title: codeSnippet.title,
          id: codeSnippet._id,
          owner: codeSnippet.owner
        }))
      }
      res.render('crud/read', { viewData })
    } catch (error) {
      console.log('error in read')
    }
  }

  // Visa updatera-sida
  async edit (req, res, next) {
    try {
      const id = req.params.id
      const codeSnippet = await CodeSnippet.findById(id)
      const viewData = {
        title: codeSnippet.title,
        description: codeSnippet.description,
        id: id
      }
      res.render('crud/edit', { viewData })
    } catch (error) {

    }
  }

  async update (req, res, next) {
    try {
      const update = await CodeSnippet.updateOne({ _id: req.body.id }, {
        description: req.body.description
      })
      req.session.flash = {
        type: 'success', text: 'Code snippet has been edited'
      }
      res.redirect('../read') // borde kanske visa snippeten
    } catch (error) {
      req.session.flash = {
        type: 'danger', text: 'Editing went wrong'
      }
    }
  }

  async remove (req, res, next) {
    try {
      console.log(req.params.id)

      const codeSnippet = await CodeSnippet.findOne({ _id: req.params.id })
      console.log(codeSnippet._id)
      const viewData = {
        id: codeSnippet._id,
        description: codeSnippet.description
      }
      req.session.flash = {
        type: 'success', text: 'Code snippet has been deleted'
      }
      res.render('crud/remove', { viewData })
    } catch (error) {
      req.session.flash = {
        type: 'danger', text: 'Delete went wrong'
      }
    }
  }

  async delete (req, res, next) {
    try {
      await CodeSnippet.deleteOne({ _id: req.body.id })

      req.session.flash = { type: 'success', text: 'Code snippet was deleted' }
      res.redirect('../read')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  async createSnippet (req, res, next) {
    try {
      console.log('in create new')
      const codeSnippet = new CodeSnippet({
        owner: req.session.username,
        title: req.body.snippetTitle,
        description: req.body.snippetDescription
      })

      if (req.session.username) {
        await codeSnippet.save()
      }
      req.session.flash = {
        type: 'success', text: 'Code snippet has been added'
      }
      res.redirect('..')
    } catch (error) {
      console.log(error.message)
      req.session.flash = { type: 'danger', text: 'Something went wrong' } // här borde valideringsfel visas
      res.redirect('./create')
    }
  }

  async getSnippetById (req, res, next) {
    try {
      console.log('param ' + req.params.id)
      const codeSnippet = await CodeSnippet.findOne({ _id: req.params.id })

      const viewData = {
        title: codeSnippet.title,
        description: codeSnippet.description,
        id: codeSnippet._id,
        owner: codeSnippet.owner
      }

      let isOwner = false
      if (res.locals.username === codeSnippet.owner) {
        isOwner = {
          isOwner: isOwner,
          username: res.locals.username
        }
      }

      res.render('crud/details', { viewData, isOwner })
    } catch (error) {
      res.redirect('..')
      console.log('ERROR IN GETSNIPID')
    }
  }

    /*async newUser (req, res) {
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
  }*/

  /*async authenticate (req, res, next) {
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
  }*/

  /*userPage (req, res) {
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
  }*/
}
