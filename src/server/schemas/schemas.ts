import { Static, Type as t } from "@sinclair/typebox";

export const errorResponseSchema = t.Object({ error: t.String() });

export const testQuerySchema = t.Object({
  id: t.String(),
  sequence: t.Array(t.Number()),
  fun: t.Optional(t.String()),
});

export const testResponseSchema = t.Object({
  toto: t.String(),
});

export type testResponse = Static<typeof testResponseSchema>;

const userSchema = t.Object({
  id: t.Number(),
  name: t.String(),
});

export const getQuizzesQuerySchema = t.Object({
  level: t.Optional(t.Number()),
  maxQuestions: t.Optional(t.Number()),
  minQuestions: t.Optional(t.Number()),
  creator: t.Optional(t.Number()),
  user: t.Optional(t.Number()),
});

const quizzSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  level: t.Number(),
  nbQuestions: t.Number(),
  creator: userSchema,
});

export type quizz = Static<typeof quizzSchema>;

export const getQuizzesResponseSchema = t.Object({
  quizzes: t.Array(quizzSchema),
});

export type getQuizzesResponse = Static<typeof getQuizzesResponseSchema>;

export const getQuizzQuerySchema = t.Object({
  id: t.Number(),
});

const answerSchema = t.Object({
  id: t.Number(),
  answer: t.String(),
});

const questionSchema = t.Object({
  id: t.Number(),
  question: t.String(),
  answers: t.Array(answerSchema),
  correctAnswerId: t.Number(),
});

export const getQuizzResponseSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  level: t.Number(),
  questions: t.Array(questionSchema),
  creator: userSchema,
});

export type getQuizzResponse = Static<typeof getQuizzResponseSchema>;
export type answer = Static<typeof answerSchema>;
export type question = Static<typeof questionSchema>;

// Create a quizz

export const postQuizzBodySchema = t.Object({
  name: t.String(),
  level: t.Number(),
  questions: t.Array(
    t.Object({
      question: t.String(),
      answers: t.Array(t.String()),
      correctAnswer: t.String(),
    }),
  ),
  creator: t.Number(),
});

export const postQuizzResponseSchema = t.Object({
  idQuizz: t.Number(),
  name: t.String(),
  level: t.Number(),
  nbQuestions: t.Number(),
  creator: userSchema,
});

export type postQuizzResponse = Static<typeof postQuizzResponseSchema>;
export type postQuizzBody = Static<typeof postQuizzBodySchema>;

// Result of a quizz

export const postGameQuerySchema = t.Object({
  idQuizz: t.Number(),
});

export const postGameBodySchema = t.Object({
  answers: t.Array(t.Object({ idQuestion: t.Number(), idAnswer: t.Number() })),
  idUser: t.Number(),
});

export const postGameResponseSchema = t.Object({
  idQuizz: t.Number(),
  score: t.Number(),
  date: t.String(),
  idUser: t.Number(),
});

export type postGameResponse = Static<typeof postGameResponseSchema>;

// User

export const getUserQuerySchema = t.Object({
  id: t.Number(),
});

export const getUserResponseSchema = userSchema;

// bests scores

export const getBestScoresQuerySchema = t.Object({
  idQuizz: t.Number(),
});

export const getBestScoresResponseSchema = t.Array(
  t.Object({
    score: t.Number(),
    date: t.String(),
    user: userSchema,
  }),
);

export type getBestScoresResponse = Static<typeof getBestScoresResponseSchema>;
