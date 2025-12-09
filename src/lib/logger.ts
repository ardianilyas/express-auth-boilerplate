import pino from 'pino';
import path from 'path';
import fs from 'fs';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const logger = pino(
    { level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' },
    pino.destination(path.join(logsDir, 'app.log'))
);

export default logger;