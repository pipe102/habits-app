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
        },
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
        },
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
        },
      },
    },
    summaryHandler
  );
}

export default habitsRoutes;
