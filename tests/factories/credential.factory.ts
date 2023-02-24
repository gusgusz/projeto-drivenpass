import {faker} from "@faker-js/faker";
import prisma from "../../src/config/database";

export async function createCredential(userId: number) {
   const credential = await prisma.credential.create({
        data: {
            title: faker.internet.userName(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password(10),
            userId: userId,
        },
    });

    return credential;

   
 
    }