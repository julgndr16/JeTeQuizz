import { server } from "../providers/server";
import {
  answer,
  errorResponseSchema,
  getQuizzQuerySchema,
  getQuizzResponse,
  getQuizzResponseSchema,
  question,
} from "../schemas/schemas";
import { db } from "../providers/db";

server.get(
  "/quizz",
  {
    schema: {
      querystring: getQuizzQuerySchema,
      response: {
        200: getQuizzResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["Quizz"],
    },
  },
  async function (request, reply): Promise<getQuizzResponse> {
    const { id } = request.query;

    if (!id) {
      return reply.code(400).send({ error: "Id is required" });
    }

    const quizz = await db.quizz.findUnique({ where: { id: id } });

    if (!quizz) {
      return reply.code(400).send({ error: "Quizz not found" });
    }

    const creator = await db.user.findUnique({
      where: { id: quizz.idCreator },
    });

    if (!creator) {
      return reply.code(500).send({
        error: `Creator of ${quizz.name} quizz not found (id: ${quizz.idCreator}`,
      });
    }

    const dbQuestions = await db.question.findMany({
      where: { idQuizz: quizz.id },
    });

    if (dbQuestions.length !== quizz.nbQuest) {
      return reply.code(500).send({
        error: `Number of questions in ${quizz.name} quizz does not match the expected number`,
      });
    }

    const questions: Array<question> = await Promise.all(
      dbQuestions.map(async (dbQuestion) => {
        const dbAnswers = await db.response.findMany({
          where: { idQuestion: dbQuestion.id },
        });
        const answers: Array<answer> = dbAnswers.map((dbAnswer) => ({
          id: dbAnswer.id,
          answer: dbAnswer.name,
        }));
        return {
          id: dbQuestion.id,
          question: dbQuestion.name,
          answers: answers,
          correctAnswerId: dbQuestion.idGoodRep,
        };
      }),
    );

    return {
      id: quizz.id,
      name: quizz.name,
      level: quizz.level,
      questions: questions,
      creator: {
        id: creator.id,
        name: creator.pseudo,
      },
    };
  },
);
