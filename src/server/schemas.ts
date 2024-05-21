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
