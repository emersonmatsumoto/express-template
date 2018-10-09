const logger = require('../logger')

/**
 * Event listener for HTTP server "error" event.
 */
const onError = {}

onError.createHandler = port => (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

module.exports = onError
