/**
 * Module for the crud-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { CodeSnippet } from '../models/codeSnippet.js'

/**
 * Encapsulates a controller.
 */
export class CrudController {
  /**
   * Renders the create page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  create (req, res) {
    console.log('in create')
    res.render('crud/create')
  }

  /**
   * Renders the read page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   * @param {Function} next - Express next middleware function.
   */
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
      res.redirect('..')
    }
  }

  /**
   * Renders the edit page for a code snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   * @param {Function} next - Express next middleware function.
   */
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
      res.redirect('..')
    }
  }

  /**
   * Updates a code snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async update (req, res) {
    try {
      await CodeSnippet.updateOne({ _id: req.body.id }, {
        description: req.body.description
      })
      req.session.flash = {
        type: 'success', text: 'Code snippet has been edited'
      }
      res.redirect('../read')
    } catch (error) {
      req.session.flash = {
        type: 'danger', text: 'Editing went wrong'
      }
    }
  }

  /**
   * Deletes a code snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async remove (req, res) {
    try {
      const codeSnippet = await CodeSnippet.findOne({ _id: req.params.id })

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

  /**
   * Deletes a code snippet from the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async delete (req, res) {
    try {
      await CodeSnippet.deleteOne({ _id: req.body.id })

      req.session.flash = { type: 'success', text: 'Code snippet was deleted' }
      res.redirect('../read')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Creates and saves a new code snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async createSnippet (req, res) {
    try {
      console.log(req.body.description)
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
      req.session.flash = { type: 'danger', text: 'Something went wrong' }
      res.redirect('./create')
    }
  }

  /**
   * Looks up a code snippet by its ID.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async getSnippetById (req, res) {
    try {
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
    }
  }
}
