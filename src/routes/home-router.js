import express from 'express'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const homeController = new HomeController()

router.get('/', homeController.index) // render home page
