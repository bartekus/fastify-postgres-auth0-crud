import { config } from 'dotenv';
import fastify from 'fastify';
import { addRoutes } from './routing';
import { serverStaticFiles } from './static';

// config .env before starting server
config();

// import db settings
import dbParams from './db';

export const server = fastify({
    logger: false,
});

// tslint:disable-next-line:no-var-requires
server.register(require('fastify-postgres'), {
    ...dbParams,
    native: true,
});

// adding routes
addRoutes(server);

// static files
serverStaticFiles(server);
