const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { transports, format } = require('./logger')
const expressWinston = require('express-winston')
const { addXRequestId } = require('./x-request-id')

const usersRouter = require('./routes/users')

const errorHandler = require('./error-handler')
const app = express()

app.use(expressWinston.logger({
  format,
  transports,
  level: (req, res) => {
    if (res.statusCode < 400) {
      return 'info'
    }
    return 'error'
  },
  requestWhitelist: ['xRequestId', 'url'],
  responseWhitelist: ['statusCode', 'body', 'stack']
}))
app.use(express.json())
app.use(addXRequestId)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)

app.use(errorHandler)

module.exports = app
