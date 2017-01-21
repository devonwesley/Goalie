import requestPromise from 'request-promise'
import qs from 'querystring'
import {readConfig} from '../../config/config'

const config = readConfig().GITHUB_URLS

const loginCallback = (request, response) => {
  const url = `${config.GITHUB_LOGIN_URL}?${qs.stringify({
    scope: 'repo',
    client_id: process.env.GITHUB_CLIENT_ID
  })}`

  response.redirect(url)
}

const tokenParams = code => {
  const client_id = process.env.GITHUB_CLIENT_ID
  const client_secret = process.env.GITHUB_CLIENT_SECRET
  return qs.stringify({code, client_id, client_secret})
}

const oauthCallback = (request, response) => {
  const options = {
    method: 'POST',
    url: `${config.OAUTH_CALLBACK_URL}?${
      tokenParams(request.query.code)
    }`
  }

  requestPromise(options).then(result => {
    const access_token = qs.parse(result).access_token
    request.session.github_access_token = access_token

    response.redirect('/goals')
  })
}

export {loginCallback, oauthCallback}
