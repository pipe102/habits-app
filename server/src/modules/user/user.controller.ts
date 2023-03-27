import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { verifyPassword } from "../../lib/hash";
import { app } from "../../server";
import { CreateUserInput, LoginInput, ValidateUserInput } from "./user.schema";
import {
  createUser,
  findUserByEmail,
  findUsers,
  validateUser,
} from "./user.service";
import nodemailer from "nodemailer";
const Transport = require("nodemailer-sendinblue-transport");

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    if (!user) {
      return reply.code(409).send({
        message: "User already exists",
      });
    }

    await sendConfirmationEmail(user.name, user.email);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function sendConfirmationEmail(
  name: string | null,
  email: string
) {
  const user = process.env.EMAIL;
  const apiKey = process.env.API_KEY;

  try {
    const transporter = nodemailer.createTransport(new Transport({ apiKey }));

    const mailOptions = {
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://${process.env.LOCALHOST_IP}:3333/confirm/${email}> Click here</a>
      </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

export async function validateUserHandler(
  request: FastifyRequest<{
    Params: ValidateUserInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const result = await validateUser(params);
    if (!result) {
      return reply.code(400).send({
        message: "User doesn't exists!",
      });
    }
    return reply.code(200).send({
      message: "User verified!",
    });
  } catch (error) {
    reply.code(500).send(error);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    return reply.code(200).send({
      accessToken: app.jwt.sign(rest),
    });
  }

  return reply.code(401).send({
    message: "Invalid email or password",
  });
}

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await findUsers();

    return reply.code(200).send(users);
  } catch (error) {
    return reply.code(500).send(error);
  }
}
