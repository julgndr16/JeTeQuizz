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
