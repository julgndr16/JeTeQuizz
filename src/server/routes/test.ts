import { server } from "../providers/server";
import {
  errorResponseSchema,
  testQuerySchema,
  testResponse,
  testResponseSchema,
} from "../schemas";

server.get(
  "/test",
  {
    schema: {
      querystring: testQuerySchema,
      response: {
        200: testResponseSchema,
        400: errorResponseSchema,
      },
    },
  },
  async function (request, reply) {
    const { id, sequence, fun } = request.query;

    if (!id) {
      return reply.code(400).send({ error: "ID query parameter is required" });
    }

    if (!sequence || sequence.length === 0) {
      return reply
        .code(400)
        .send({ error: "Sequence query parameter is required" });
    }

    const res: testResponse = {
      toto: `${id} donne ${sequence} avec ${fun}`,
    };

    return res;
  },
);
