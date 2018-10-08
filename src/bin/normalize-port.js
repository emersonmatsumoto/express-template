/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

module.exports = normalizePort
