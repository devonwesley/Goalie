import express from 'express'
import {match} from 'react-router'
import path from 'path'
import clientRequest from './setup_react_serve'
import routes from '../../browser/routes'

const router = express.Router()

router.get('/', (request, response) =>
  response.sendFile(path.join(__dirname, '../../public/LoggedOutPage.html'))
)

router.use((request, reponse) =>
  match({routes, location: request.url}, clientRequest(request, reponse))
)

module.exports = router
