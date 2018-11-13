const { createLogger, format, transports } = require('winston')
const { combine, timestamp, json } = format
const level = process.env.LOG_LEVEL || 'debug'

const logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      level,
      timestamp: () => new Date().toISOString(),
      stderrLevels: ['error', 'critical']
    })
  ]
})

module.exports = logger
