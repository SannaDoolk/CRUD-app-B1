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

  // GLÖM EJ GÖRA ASYNC
  index (req, res) {
    res.render('home/index')
  }
  
  logIn (req, res) {
    res.render('login/log-in')
  }

  register (req, res) {
    res.render('register/register')
  }

  createNew (req, res) {
    res.render('crud/create')
  }

  read (req, res) {
    res.render('crud/read')
  }

  update (req, res) {
    res.render('crud/update')
  }

  delete (req, res) {
    res.render('crud/delete')
  }
}
