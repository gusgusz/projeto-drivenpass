import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "../database";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(10);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  

  const user = await prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });

  const u = {
    id: user.id,
    email: user.email,
    password: incomingPassword,
  };
  return u;
}

