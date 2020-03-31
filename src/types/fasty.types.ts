import { FastifyRequest, DefaultQuery, DefaultParams, DefaultHeaders } from 'fastify';
import { IncomingMessage } from 'http';

export interface FastifyRequestHandler extends FastifyRequest<IncomingMessage,
    DefaultQuery, DefaultParams, DefaultHeaders, any> {
}
