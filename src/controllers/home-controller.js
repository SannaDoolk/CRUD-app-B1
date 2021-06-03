/**
 * Module for the home-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import { User } from '../models/user.js'
import { CodeSnippet } from '../models/codeSnippet.js'

/**
 *
 */
export class HomeController {
/**
 * .
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

  // Visa home
  async index (req, res, next) {
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
      console.log('error in index')
    }
  }
}
