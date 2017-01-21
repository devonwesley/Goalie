import express from 'express'
const {
  loginCallback,
  oauthCallback
} = require('./request_callbacks/auth')

const router = express.Router()

router.get('/login', loginCallback)
router.get('/oauth_callback', oauthCallback)

module.exports = router
