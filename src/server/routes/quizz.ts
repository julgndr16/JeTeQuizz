import { server } from "../providers/server";
import {
  answer,
  errorResponseSchema,
  getQuizzQuerySchema,
  getQuizzResponse,
  getQuizzResponseSchema,
  postQuizzBodySchema,
  postQuizzResponse,
  postQuizzResponseSchema,
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

server.post(
  "/quizz",
  {
    schema: {
      body: postQuizzBodySchema,
      response: {
        200: postQuizzResponseSchema,
        400: errorResponseSchema,
      },
      tags: ["Quizz"],
    },
  },
  async function (request, reply): Promise<postQuizzResponse> {
    const { name, level, questions, creator } = request.body;

    if (!name) {
      return reply.code(400).send({ error: "Body: Name field is required" });
    }

    if (!level) {
      return reply.code(400).send({ error: "Body: Level field is required" });
    }

    if (!questions) {
      return reply
        .code(400)
        .send({ error: "Body: Questions field is required" });
    }

    if (questions.length < 1) {
      return reply.code(400).send({
        error: "Body: Questions field must contain at least one question",
      });
    }

    if (!creator) {
      return reply.code(400).send({ error: "Body: Creator field is required" });
    }

    const dbUser = await db.user.findUnique({ where: { id: creator } });

    if (!dbUser) {
      return reply.code(500).send({ error: "User not found" });
    }

    for (const question of questions) {
      if (!question.question) {
        return reply
          .code(400)
          .send({ error: "Body: questions[i].Question field is required" });
      }
      if (!question.answers) {
        return reply
          .code(400)
          .send({ error: "Body: questions[i].Answers field is required" });
      }
      if (question.answers.length < 1) {
        return reply.code(400).send({
          error:
            "Body: questions[i].Answers field must contain at least one answer",
        });
      }
      if (!question.correctAnswer) {
        return reply.code(400).send({
          error: "Body: questions[i].CorrectAnswer field is required",
        });
      }

      if (!question.answers.includes(question.correctAnswer)) {
        return reply.code(400).send({
          error: "Body: questions[i].CorrectAnswer must be in answers",
        });
      }
    }

    const dbQuizz = await db.quizz.create({
      data: {
        name: name,
        level: level,
        nbQuest: questions.length,
        idCreator: creator,
      },
    });

    for (const question of questions) {
      const dbQuestion = await db.question.create({
        data: {
          name: question.question,
          idQuizz: dbQuizz.id,
          idGoodRep: 1,
        },
      });

      for (const answer of question.answers) {
        const dbAnswer = await db.response.create({
          data: {
            name: answer,
            idQuestion: dbQuestion.id,
          },
        });
        if (answer === question.correctAnswer) {
          await db.question.update({
            where: { id: dbQuestion.id },
            data: { idGoodRep: dbAnswer.id },
          });
        }
      }
    }

    return {
      idQuizz: dbQuizz.id,
      name: dbQuizz.name,
      level: dbQuizz.level,
      nbQuestions: dbQuizz.nbQuest,
      creator: {
        id: dbUser.id,
        name: dbUser.pseudo,
      },
    };
  },
);
