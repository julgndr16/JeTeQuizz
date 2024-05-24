import { server } from "../providers/server";
import {
  errorResponseSchema,
  getQuizzesQuerySchema,
  getQuizzesResponseSchema,
  quizz,
} from "../schemas/schemas";
import { db } from "../providers/db";

server.get(
  "/quizzes",
  {
    schema: {
      querystring: getQuizzesQuerySchema,
      response: {
        200: getQuizzesResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["Quizz"],
    },
  },
  async function (request, reply) {
    const { level, maxQuestions, minQuestions, creator, user } = request.query;

    if (level && (level < 0 || level > 5)) {
      return reply.code(400).send({ error: "Level must be between 0 and 5" });
    }

    if (maxQuestions && maxQuestions < 1) {
      return reply
        .code(400)
        .send({ error: "Max questions must be greater than 0" });
    }

    if (minQuestions && minQuestions < 1) {
      return reply
        .code(400)
        .send({ error: "Min questions must be greater than 0" });
    }

    if (maxQuestions && minQuestions && maxQuestions < minQuestions) {
      return reply
        .code(400)
        .send({ error: "Max questions must be greater than min questions" });
    }

    if (creator && user && creator === user) {
      return reply
        .code(400)
        .send({ error: "Creator and user.ts must be different" });
    }

    const dbQuizzes = await db.quizz.findMany({
      where: {
        nbQuest: { gte: minQuestions ?? 0, lte: maxQuestions ?? 1000 },
        level: level,
        idCreator: { not: user, equals: creator },
      },
    });

    const quizzes: Array<quizz> = await Promise.all(
      dbQuizzes.map(async (quizz): Promise<quizz> => {
        const creator = await db.user.findUnique({
          where: { id: quizz.idCreator },
        });

        if (!creator) {
          return reply
            .code(500)
            .send({ error: "Creator not found ! Check database integrity !" });
        }

        return {
          id: quizz.id,
          name: quizz.name,
          level: quizz.level,
          nbQuestions: quizz.nbQuest,
          creator: {
            id: creator.id,
            name: creator.pseudo,
          },
        };
      }),
    );

    return { quizzes };
  },
);
