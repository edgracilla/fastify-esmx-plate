import { dirname, basename } from 'path';

import ctl from './controller.mjs';
import vld from './validation.mjs';

async function routes(fastify) {
  const resource = basename(dirname(import.meta.url));

  /** create */

  fastify.post(`/${resource}`, vld.postSchema, async (request, reply) => {
    const { body } = request;

    const result = await ctl.create(body);
    reply.code(201).send(result);
  });

  /** read */

  fastify.get(`/${resource}/:id`, async (request, reply) => {
    const { params } = request;

    const result = await ctl.read(params.id);
    reply.send(result);
  });

  /** update */

  fastify.patch(`/${resource}/:id`, vld.patchSchema, async (request, reply) => {
    const { params, body, meta } = request;

    const result = await ctl.update(params.id, body, meta);
    reply.send(result);
  });

  /** search */

  fastify.get(`/${resource}`, vld.getSchema, async (request, reply) => {
    const { query } = request;

    const result = await ctl.search(query);
    reply.send(result);
  });
}

export default routes;
