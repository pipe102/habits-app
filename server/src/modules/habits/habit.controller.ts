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
  findHabitUserById,
} from "./habit.service";

export async function createHabitHandler(
  request: FastifyRequest<{
    Body: CreateHabitInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const habit = await createHabit({ ...body, userId: request.user.id });

    return reply.code(201).send(habit);
  } catch (error) {
    return reply.code(500).send(error);
  }
}

export async function habitDayHandler(
  request: FastifyRequest<{
    Querystring: HabitDayInput;
  }>,
  reply: FastifyReply
) {
  const query = request.query;

  try {
    const { possibleHabits, completedHabits } = await getHabitsDay({
      ...query,
      userId: request.user.id,
    });

    return reply.code(200).send({
      possibleHabits,
      completedHabits,
    });
  } catch (error) {
    reply.code(500).send(error);
  }
}

export async function toggleHabitHandler(
  request: FastifyRequest<{
    Params: ToggleHabitInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  const habit = await findHabitUserById(params.id);

  if (habit?.userId !== request.user.id) {
    return reply.code(403).send({
      message: "You dont have permission to access this habit",
    });
  }

  try {
    await toggleHabit({ ...params, userId: request.user.id });
  } catch (error) {
    console.log(error);
    reply.code(500).send(error);
  }
}

export async function summaryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const summary = await getSummary(request.user.id);

    return reply.code(200).send(summary);
  } catch (error) {
    return reply.code(500).send(error);
  }
}
