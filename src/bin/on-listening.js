const debug = require('debug')('express-template:server')

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = server => () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

module.exports = onListening
