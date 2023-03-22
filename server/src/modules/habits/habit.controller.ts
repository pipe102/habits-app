import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateHabitInput,
  HabitDayInput,
  ToggleHabitInput,
} from "./habit.schema";
import {
  createHabit,
  toggleHabit,
  getSummary,
  getHabitsDay,
} from "./habit.service";

export async function createHabitHandler(
  request: FastifyRequest<{
    Body: CreateHabitInput;
  }>
) {
  const body = request.body;

  const habit = await createHabit({ ...body, userId: request.user.id });

  return habit;
}

export async function habitDayHandler(
  request: FastifyRequest<{
    Querystring: HabitDayInput;
  }>
) {
  const query = request.query;

  const { possibleHabits, completedHabits } = await getHabitsDay({
    ...query,
    userId: request.user.id,
  });

  return { possibleHabits, completedHabits };
}

export async function toggleHabitHandler(
  request: FastifyRequest<{
    Params: ToggleHabitInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    await toggleHabit({ ...params, userId: request.user.id });
  } catch (error) {
    console.log(error);
    reply.code(500).send(error);
  }
}

export async function summaryHandler(request: FastifyRequest) {
  const summary = getSummary(request.user.id);

  return summary;
}
