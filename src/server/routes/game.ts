import { db } from "../providers/db";
import { server } from "../providers/server";
import {
  errorResponseSchema,
  postGameBodySchema,
  postGameQuerySchema,
  postGameResponse,
  postGameResponseSchema,
} from "../schemas/schemas";

server.post(
  "/game",
  {
    schema: {
      querystring: postGameQuerySchema,
      body: postGameBodySchema,
      response: {
        200: postGameResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["Game"],
    },
  },
  async function (request, reply): Promise<postGameResponse> {
    const { idQuizz } = request.query;
    const { answers, idUser } = request.body;

    if (!idQuizz) {
      return reply.status(400).send({ error: "idQuizz is required" });
    }

    if (!answers) {
      return reply.status(400).send({ error: "answers is required" });
    }

    if (!idUser) {
      return reply.status(400).send({ error: "idUser is required" });
    }

    // Get the quizz
    const dbQuizz = await db.quizz.findUnique({ where: { id: idQuizz } });

    if (!dbQuizz) {
      return reply.status(500).send({ error: "Quizz not found" });
    }

    if (dbQuizz.nbQuest !== answers.length) {
      reply.status(400).send({
        error: "answers must have the same length as the number of questions",
      });
    }

    let score = 0;
    for (const answer of answers) {
      const dbQuestion = await db.question.findUnique({
        where: { id: answer.idQuestion },
      });

      if (!dbQuestion) {
        return reply
          .status(500)
          .send({ error: `Question not found (id: ${answer.idQuestion}` });
      }

      if (dbQuestion.idGoodRep === answer.idAnswer) {
        score++;
      }
    }

    const date = new Date().toISOString();

    await db.game.create({
      data: { score, date, idUser, idQuizz },
    });

    return {
      idQuizz,
      score,
      date,
      idUser,
    };
  },
);
