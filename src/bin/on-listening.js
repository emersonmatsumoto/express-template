const logger = require('../logger')

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = {}

onListening.createHandler = server => () => {
  const addr = server.address()
  const bind = `port ${addr.port}`

  logger.info(`Listening on ${bind}`)
}

module.exports = onListening
