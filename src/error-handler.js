const errorHandler = ({ message, stack }, req, res, next) => {
  res.stack = stack
  res.status(500).send({ error: message })
}

module.exports = errorHandler
