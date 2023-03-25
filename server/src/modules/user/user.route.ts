import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerUserHandler,
  getUsersHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
        tags: ["User"],
      },
    },
    registerUserHandler
  );

  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
        tags: ["User"],
      },
    },
    loginHandler
  );

  app.get(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ["User"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    getUsersHandler
  );
}

export default userRoutes;
