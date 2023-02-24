import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import { createUser } from "./factories/user-factory";
import prisma from "./database";
import dotenv from "dotenv";
dotenv.config();







export async function cleanDb() {
  await prisma.credential.deleteMany({});
    await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
  
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const objEmail = { email: incomingUser.email };
    const token = jwt.sign(objEmail, process.env.TOKEN_SECRET, { expiresIn: '10000s' });

  return token;
}
