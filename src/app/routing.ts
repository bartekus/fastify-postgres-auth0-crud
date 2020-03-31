import { FastifyInstance, FastifyReply, FastifyRequest, DefaultQuery, DefaultParams, DefaultHeaders } from 'fastify';
import { ServerResponse, IncomingMessage } from 'http';
import { FastifyRequestHandler } from '../types/fasty.types';

const privateHookHandler = (req, res, next) => {
    // here do some JWT check
    next();
};

function secretHandler(req: FastifyRequestHandler,  res: FastifyReply<ServerResponse>) {
    res.send({
        okay: req.body.username,
    });
}

function privateRouter(server: FastifyInstance, options, next) {
    server.register(async (fastify) => {
        fastify.addHook('preHandler', privateHookHandler);
        // fastify.addContentTypeParser('')
        fastify.post('/secret', secretHandler);
    });
    next();
}

function publicRouter(server: FastifyInstance, options, next) {
    server.get('/welcome', (req, res) => {
        res.send('hello!!');
    });

    server.get('/user/:id', async (req, reply) => {
        // @ts-ignore
        const client = await server.pg.connect();
        const { rows } = await client.query('SELECT id, username, email, hash, salt FROM users WHERE id=$1', [req.params.id]);
        client.release();
        return rows;
    });

    next();
}

export const addRoutes = (server: FastifyInstance) => {
    server.register(privateRouter, { prefix: '/api/private' });
    server.register(publicRouter, { prefix: '/api/public' });
};
