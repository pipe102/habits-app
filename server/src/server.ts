import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJWT from "@fastify/jwt";
import cors from "@fastify/cors";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { habitSchemas } from "./modules/habits/habit.schema";
import habitsRoutes from "./modules/habits/habit.route";

export const app = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

for (const schema of [...userSchemas, ...habitSchemas]) {
  app.addSchema(schema);
}

app.register(cors);
app.register(fastifyJWT, {
  secret: process.env.SECRETJWT || "hcasjbcdalknvdslnvsdkvdsvdsfvs",
});
app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);
app.register(userRoutes, { prefix: "api/users" });
app.register(habitsRoutes, { prefix: "api/habits" });

app
  .listen({
    port: 3333,
    host: process.env.LOCALHOST_IP,
  })
  .then(() => {
    console.log("Server running! ✅");
  });
