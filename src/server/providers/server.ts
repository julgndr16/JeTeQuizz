import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { ajvFilePlugin } from "@fastify/multipart";

export const server = fastify({
  logger: true,
  ajv: {
    // Adds the file plugin to help @fastify/swagger schema generation
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    plugins: [ajvFilePlugin],
  },
}).withTypeProvider<TypeBoxTypeProvider>();

export const configurePlugins = async () => {
  await server.register(fastifySwagger, {
    openapi: {},
    swagger: {
      consumes: ["application/json", "multipart/form-data"],
      produces: ["application/json"],
      //tags: [],
    },
  });
  await server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
  await server.register(fastifyMultipart);
};
