import { FastifyInstance } from "fastify";
import {
  createHabitHandler,
  habitDayHandler,
  summaryHandler,
  toggleHabitHandler,
} from "./habit.controller";
import { $ref } from "./habit.schema";

async function habitsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("createHabitSchema"),
        response: {
          201: $ref("createHabitResponseSchema"),
          400: $ref("errorResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
        },
        tags: ["Habit"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    createHabitHandler
  );

  app.get(
    "/day",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $ref("habitDaySchema"),
        response: {
          200: $ref("habitDayResponseSchema"),
          400: $ref("errorResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          403: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
        },
        tags: ["Habit"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    habitDayHandler
  );

  app.patch(
    "/:id/toggle",
    {
      preHandler: [app.authenticate],
      schema: {
        params: $ref("toggleHabitSchema"),
        response: {
          400: $ref("errorResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
        },
        tags: ["Habit"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    toggleHabitHandler
  );

  app.get(
    "/summary",
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: $ref("summaryResponseSchema"),
          401: $ref("unauthorizedResponseSchema"),
          500: $ref("errorResponseSchema"),
        },
        tags: ["Habit"],
        security: [{ bearerAuth: ["read:protected-data"] }],
      },
    },
    summaryHandler
  );
}

export default habitsRoutes;
