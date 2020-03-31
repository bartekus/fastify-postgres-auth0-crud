import { FastifyInstance } from 'fastify';
import { join } from 'path';

const staicFilePath = join(process.cwd(), 'static');

console.log(staicFilePath);

export const serverStaticFiles = (server: FastifyInstance) => {
    server.register(require('fastify-static'), {
        root: staicFilePath,
    });
};
