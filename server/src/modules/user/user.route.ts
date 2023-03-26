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
          400: $ref("errorResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
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
          400: $ref("errorResponseSchema"),
          500: $ref("errorResponseSchema"),
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
        response: {
          200: $ref("getUsersResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
        },
        tags: ["User"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    getUsersHandler
  );
}

export default userRoutes;
