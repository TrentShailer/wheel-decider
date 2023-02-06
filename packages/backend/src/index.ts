import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs";

const fastify = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "frontend"),
});

fastify.get("/", async (request, reply) => {
  return reply.sendFile("index.html", path.join(__dirname, "frontend"));
});

fastify.listen({ port: 8080, host: "0.0.0.0" }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
