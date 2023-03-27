import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { type } from "os";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

const validateUserSchema = z.object({
  email: z.string(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const getUsersResponseSchema = z.array(
  z.object({
    email: z.string().email(),
    name: z.string(),
    id: z.number(),
  })
);

const errorResponseSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

const messageResponseSchema = z.object({
  message: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type ValidateUserInput = z.infer<typeof validateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    validateUserSchema,
    loginSchema,
    loginResponseSchema,
    getUsersResponseSchema,
    errorResponseSchema,
    messageResponseSchema,
  },
  { $id: "UserSchema" }
);
