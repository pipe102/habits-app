import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createHabitSchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)),
});

const createHabitResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  created_at: z.string(),
  userId: z.number(),
});

const habitDaySchema = z.object({
  date: z.coerce.date(),
});

const habitDayResponseSchema = z.object({
  possibleHabits: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      created_at: z.string(),
      userId: z.number(),
    })
  ),
  completedHabits: z.array(z.string()),
});

const toggleHabitSchema = z.object({
  id: z.string().uuid(),
});

const summaryResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    date: z.string(),
    completed: z.number(),
    amount: z.number(),
  })
);

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type HabitDayInput = z.infer<typeof habitDaySchema>;
export type ToggleHabitInput = z.infer<typeof toggleHabitSchema>;

export const { schemas: habitSchemas, $ref } = buildJsonSchemas(
  {
    createHabitSchema,
    createHabitResponseSchema,
    habitDaySchema,
    habitDayResponseSchema,
    toggleHabitSchema,
    summaryResponseSchema,
  },
  { $id: "HabitSchema" }
);
