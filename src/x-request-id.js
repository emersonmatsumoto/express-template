const uuidv4 = require('uuid/v4')

const addXRequestId = (req, res, next) => {
  req.xRequestId = req.get('X-Request-Id') || uuidv4()
  res.set('X-Request-Id', req.xRequestId)
  next()
}

module.exports = { addXRequestId }
