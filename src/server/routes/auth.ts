import { server } from "../providers/server";
import { errorResponseSchema } from "../schemas/schemas";
import { Static, Type as t } from "@sinclair/typebox";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage",
);

const getAuth = t.Object({
  refresh_token: t.Optional(t.Any()), //t.Union([t.String(), t.Null()]),
  expiry_date: t.Optional(t.Any()), //t.Union([t.Number(), t.Null()]),
  access_token: t.Optional(t.Any()), //t.Union([t.String(), t.Null()]),
  token_type: t.Optional(t.Any()), //t.Union([t.String(), t.Null()]),
  id_token: t.Optional(t.Any()), //t.Union([t.String(), t.Null()]),
  scope: t.Optional(t.Any()), //t.Union([t.String(), t.Null()]),
});

export const getAuthQuery = t.Object({
  code: t.String(),
});

export type auth = Static<typeof getAuth>;

server.post(
  "/auth/google",
  {
    schema: {
      querystring: getAuthQuery,
      response: {
        200: getAuth,
        400: errorResponseSchema,
      },
    },
  },
  async function (request, reply): Promise<auth> {
    const { code } = request.query;
    const { tokens } = await oAuth2Client.getToken(code);

    return tokens;
  },
);

server.post(
  "/auth/google/refresh_token",
  {
    schema: {
      body: t.Object({ refreshToken: t.String() }),
      response: {
        200: getAuth,
        400: errorResponseSchema,
      },
    },
  },
  async function (request, reply): Promise<auth> {
    const user = new UserRefreshClient(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      request.body.refreshToken,
    );

    const { credentials } = await user.refreshAccessToken(); // optain new tokens

    return credentials;
  },
);
