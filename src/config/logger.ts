import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, meta }) => {
            return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
        })
    ),
    transports: [
        new transports.Console()
    ],
});

export default logger;