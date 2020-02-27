const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, splat, printf } = format
 
const logger = createLogger({
  level: 'info',
  format: combine(
    splat(),
    label({label: 'microservices'}),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
    })
  ),
  transports: [ 
      new transports.Console(),
      new transports.File({ filename: './logs/logfile.log' }),
      new transports.File({
        name: 'error-file',
        filename: './logs/logfile-error.log',
        level: 'error'
      }),
      new transports.File({
        name: 'info-file',
        filename: './logs/logfile-info.log',
        level: 'info'
      }),
      new transports.File({
        name: 'warn-file',
        filename: './logs/logfile-warn.log',
        level: 'warn'
      }),
      new transports.File({
        name: 'debug-file',
        filename: './logs/logfile-debug.log',
        level: 'debug'
      })
    ]
})
 
// highest to lowest
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}
 
module.exports = logger
