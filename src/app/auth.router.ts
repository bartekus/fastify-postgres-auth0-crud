import { FastifyInstance } from "fastify";

export const registerHooks = (server: FastifyInstance) => {
    server.addHook('onRequest', (req, reply, next) => {
        console.log(req.raw.url);
        next();
    });
};
