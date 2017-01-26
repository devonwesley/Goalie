import express from 'express'
import {match} from 'react-router'
import clientRequest from './setup_react_serve'
import routes from '../../browser/routes'

const router = express.Router()

router.get('/', (request, response) =>
  response.send('<a type="button" href="/api/v1/auth/login">Log In</a>')
)

router.use((request, response) =>
  match({routes, location: request.url}, clientRequest(request, response))
)

module.exports = router
