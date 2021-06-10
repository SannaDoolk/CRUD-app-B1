/**
 * Home routers.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const homeController = new HomeController()

router.get('/', homeController.index) // render home page
