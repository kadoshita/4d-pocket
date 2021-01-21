#!/usr/bin/env node

import fastify from 'fastify';
import log4js from 'log4js';
import colors from 'colors';

log4js.configure({
    appenders: {
        'out': {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%r %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'debug',
            enableCallStack: true
        }
    }
});
const logger = log4js.getLogger('out');

const server = fastify();

server.all('*', async (request, reply) => {
    switch (request.method.toLowerCase()) {
        case 'get': logger.info(`${colors.green(`[${request.method}]`)}  \t${request.url} ${JSON.stringify(request.headers)} ${JSON.stringify(request.body)}`); break;
        case 'post': logger.info(`${colors.blue(`[${request.method}]`)}  \t${request.url} ${JSON.stringify(request.headers)} ${JSON.stringify(request.body)}`); break;
        case 'put': logger.info(`${colors.yellow(`[${request.method}]`)}  \t${request.url} ${JSON.stringify(request.headers)} ${JSON.stringify(request.body)}`); break;
        case 'delete': logger.info(`${colors.red(`[${request.method}]`)}  \t${request.url} ${JSON.stringify(request.headers)} ${JSON.stringify(request.body)}`); break;
        default: logger.info(`${colors.white(`[${request.method}]`)}  \t${request.url} ${JSON.stringify(request.headers)} ${JSON.stringify(request.body)}`); break;
    }
    return reply.code(200).send();
});

const { argv } = process;
const port: number = (argv[2] === '-p' && argv[3]) ? parseInt(argv[3], 10) : 3000;

server.listen(port, '127.0.0.1', (err, address) => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    logger.info(`Server listening at ${address}`);
});