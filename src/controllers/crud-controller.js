/**
 * Module for the crud-controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

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
  index (req, res) {
    res.render('crud/index')
  }

  logIn (req, res) {
    res.render('crud/log-in')
  }

  register (req, res) {
    res.render('crud/register')
  }

  createNew (req, res) {
    res.render('crud/create')
  }
}
