import {faker} from "@faker-js/faker";
import prisma from "../../src/config/database";

export async function createCredential(userId: number) {
    const credential = await prisma.credential.create({
        data: {
        title:  faker.internet.userName(),
        url:  faker.internet.url(),
        password:  faker.internet.password(6),
        username:  faker.internet.userName(),
        userId

        },
    });

    return credential;
 
    }