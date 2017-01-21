import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import cors from 'cors'
import auth from './routes/auth'
import goals from './routes/goals'
import comments from './routes/comments'
import serveReact from './routes/server_side_react/serve-react'
const app = express()

if (app.get('env') !== 'production'){require('dotenv').config()}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'browser', 'favicon.ico')))
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}))
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'browser'),
  dest: path.join(__dirname, 'browser'),
  indentedSyntax: true,
  sourceMap: true
}))
app.use(cors())

app.use('/api/v1/auth', auth)
app.use('/api/v1/goals', goals)
app.use('/api/v1/comments', comments)

// NOTE: This route is last since we want to match the dynamic routes above
// first before attempting to match a static resource (js/css/etc)
app.use(express.static(path.join(__dirname, 'browser')))
app.use('/', serveReact)

app.use((request, response, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, request, response) =>
  response.status(error.status || 500).json({
    message: error.message,
    error: req.app.get('env') === 'development' ? error : {},
    code: 500
  })
)

module.exports = app
