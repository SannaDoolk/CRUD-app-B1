/**
 * Module for the home-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { CodeSnippet } from '../models/codeSnippet.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders the index page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express request object.
   */
  async index (req, res) {
    try {
      let loggedIn = false
      if (res.locals.username !== undefined) {
        loggedIn = true
      }
      const viewData = {
        codeSnippets: (await CodeSnippet.find({})).map(codeSnippet => ({
          title: codeSnippet.title,
          id: codeSnippet._id
        }))
      }
      const isLoggedIn = {
        isLoggedIn: loggedIn,
        username: res.locals.username
      }

      res.render('home/index', { viewData, isLoggedIn })
    } catch (error) {
      res.redirect('..')
    }
  }
}
