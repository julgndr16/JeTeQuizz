import { server } from "../providers/server";
import {
  errorResponseSchema,
  getUserQuerySchema,
  getUserResponse,
  getUserResponseSchema,
  postUserBodySchema,
  postUserResponse,
  postUserResponseSchema,
  putUserTokenQuerySchema,
} from "../schemas/schemas";
import { db } from "../providers/db";

server.get(
  "/user",
  {
    schema: {
      querystring: getUserQuerySchema,
      response: {
        200: getUserResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["User"],
    },
  },
  async function (request, reply): Promise<getUserResponse> {
    const { email } = request.query;

    const dbUser = (await db.user.findMany({ where: { mail: email } }))[0];

    if (!dbUser) {
      return reply
        .status(400)
        .send({ error: `User not found with email: ${email}` });
    }

    return {
      id: dbUser.id,
      name: dbUser.pseudo,
      email: dbUser.mail,
      token_expiration: dbUser.token,
    };
  },
);

server.post(
  "/user",
  {
    schema: {
      body: postUserBodySchema,
      response: {
        200: postUserResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["User"],
    },
  },
  async function (request, reply): Promise<postUserResponse> {
    const { email, name, token_expiration } = request.body;

    const dbUser = await db.user.create({
      data: {
        mail: email,
        pseudo: name,
        token: token_expiration,
      },
    });

    return {
      id: dbUser.id,
      name: dbUser.pseudo,
      email: dbUser.mail,
    };
  },
);

server.put(
  "/user/update_token",
  {
    schema: {
      querystring: putUserTokenQuerySchema,
      response: {
        200: postUserResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["User"],
    },
  },
  async function (request, reply): Promise<postUserResponse> {
    const { id, token_expiration } = request.query;

    const dbUser = await db.user.update({
      where: { id },
      data: {
        token: token_expiration,
      },
    });

    return {
      id: dbUser.id,
      name: dbUser.pseudo,
      email: dbUser.mail,
    };
  },
);
