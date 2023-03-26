import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";
import {
  CreateHabitInput,
  HabitDayInput,
  ToggleHabitInput,
} from "./habit.schema";

export async function createHabit(
  input: CreateHabitInput & { userId: number }
) {
  const { title, weekDays } = input;

  const today = dayjs().startOf("day").toDate();

  return await prisma.habit.create({
    data: {
      title,
      created_at: today,
      weekDays: {
        create: weekDays.map((weekDay) => {
          return {
            week_day: weekDay,
          };
        }),
      },
      userId: input.userId,
    },
  });
}

export async function toggleHabit(
  input: ToggleHabitInput & { userId: number }
) {
  const { id } = input;

  const today = dayjs().startOf("day").toDate();

  let day = await prisma.day.findUnique({
    where: {
      date_userId: {
        date: today,
        userId: input.userId,
      },
    },
  });

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today,
        userId: input.userId,
      },
    });
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id_userId: {
        day_id: day.id,
        habit_id: id,
        userId: input.userId,
      },
    },
  });

  if (dayHabit) {
    await prisma.dayHabit.delete({
      where: {
        day_id_habit_id_userId: {
          day_id: day.id,
          habit_id: id,
          userId: input.userId,
        },
      },
    });
  } else {
    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id,
        userId: input.userId,
      },
    });
  }
}

export async function findHabitUserById(id: string) {
  return prisma.habit.findUnique({
    where: {
      id,
    },
  });
}

export async function getHabitsDay(input: HabitDayInput & { userId: number }) {
  const { date } = input;

  const parsedDate = dayjs(date).startOf("day");
  const weekDay = parsedDate.get("day");

  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date,
      },
      weekDays: {
        some: {
          week_day: weekDay,
        },
      },
      userId: input.userId,
    },
  });

  const day = await prisma.day.findUnique({
    where: {
      date_userId: {
        date: parsedDate.toDate(),
        userId: input.userId,
      },
    },
    include: {
      dayHabits: true,
    },
  });

  const completedHabits =
    day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    }) ?? [];

  return {
    possibleHabits,
    completedHabits,
  };
}

export async function getSummary(userId: number) {
  try {
    return prisma.$queryRaw`
      SELECT D.id, D.date ,
        (
          SELECT cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id AND DH.userId = ${userId}
        ) as completed,
        (
          SELECT cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
          on H.id = HWD.habit_id AND H.userId = D.userId
          WHERE HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
        ) as amount
      FROM days D
      WHERE D.userId = ${userId}
     `;
  } catch (error) {
    console.log(error);
  }
}
