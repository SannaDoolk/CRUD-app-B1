/**
 * The starting point of the application.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import hbs from 'express-hbs'
// import session from 'express-session'
// import helmet from 'helmet'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'

// Create express application
const app = express()

// Get the directory name of this module's path.
const directoryFullName = dirname(fileURLToPath(import.meta.url))
// Morgan
app.use(logger('dev'))
// View Engine
app.engine('hbs', hbs.express4({
  defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
  partialsDir: join(directoryFullName, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(directoryFullName, 'views'))

app.use(express.urlencoded({ extended: false }))

// Static files
app.use(express.static(join(directoryFullName, '..', 'public')))

app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
