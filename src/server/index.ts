import { configurePlugins, server } from "./providers/server";

const { SERVER_PORT = 3001, SERVER_HOST = "localhost" } = process.env;

const main = async () => {
  try {
    await configurePlugins();

    await Promise.all([
      await import("./routes/quizzes"),
      await import("./routes/quizz"),
      await import("./routes/game"),
      await import("./routes/scores"),
      await import("./routes/auth"),
      await import("./routes/user"),
    ]);

    await server.listen({
      port: Number(SERVER_PORT),
      host: SERVER_HOST,
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

main().catch(console.error);
