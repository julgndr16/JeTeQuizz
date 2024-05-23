import { server } from "../providers/server";
import {
  errorResponseSchema,
  getBestScoresQuerySchema,
  getBestScoresResponse,
  getBestScoresResponseSchema,
} from "../schemas/schemas";
import { db } from "../providers/db";

server.get(
  "/scores",
  {
    schema: {
      querystring: getBestScoresQuerySchema,
      response: {
        200: getBestScoresResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["Game"],
    },
  },
  async function (request, reply): Promise<getBestScoresResponse> {
    const { idQuizz } = request.query;

    if (!idQuizz) {
      return reply.status(400).send({ error: "idQuizz is required" });
    }

    const dbBestGames = await db.game.findMany({
      where: { idQuizz },
      orderBy: { score: "desc" },
      take: 10,
    });

    return Promise.all(
      dbBestGames.map(async (game) => {
        const user = await db.user.findUnique({
          where: { id: game.idUser },
        });
        return {
          score: game.score,
          date: game.date.toISOString(),
          user: {
            id: game.idUser,
            name: user?.pseudo ?? `User ${game.idUser}`,
          },
        };
      }),
    );
  },
);
