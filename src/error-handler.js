const logger = require('./logger')

const errorHandler = ({ message, stack }, req, res, next) => {
  logger.error(message, { stack })
  res.status(500).send({ error: message })
}

module.exports = errorHandler
