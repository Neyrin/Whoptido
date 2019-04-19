//-- BÄTTRE VERSION --
const {
    createLogger,
    format,
    transports
} = require('winston');

const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.File({ 
          filename: 'logs/error.log', 
          level: 'error' 
        }),
      new transports.File({ 
          filename: 'logs/combined.log', 
          level: 'info'
        }),
      new transports.Console({
          level: 'debug',
          format: format.combine(
              format.colorize(),
              format.printf(info => `${info.level}: ${info.message}`)
          )
        }),
    ]
});

process.on('uncaughtException', error => {
    logger.error(`Uncaught exception: ${error}`);
});


//--  MIN VERSION --
// const winston = require('winston')

// const logger = winston.createLogger({
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write to all logs with level `info` and below to `combined.log` 
//       // - Write all logs error (and below) to `error.log`.
//       //
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log', level: 'info'}),
//       new winston.transports.Console({level: 'debug'})
//     ]
//   });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
//   if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//       format: winston.format.simple()
//     }));
//   }

//Logs are writtern like this
//logger.info('Message');
//logger.error('Message')

  module.exports = logger;
