import { hashPassword } from "../../lib/hash";
import { prisma } from "../../lib/prisma";
import { CreateUserInput, ValidateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const userExists = await findUserByEmail(rest.email);

  if (userExists) {
    return null;
  }

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

export async function validateUser(input: ValidateUserInput) {
  const { email } = input;

  const user = await findUserByEmail(email);

  console.log(user);

  if (!user) {
    return null;
  }

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
    },
  });
}

export async function findUserByEmail(email: string) {
  console.log(email);
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
      verified: true,
    },
  });
}
