import {faker} from "@faker-js/faker";
import prisma from "../../src/config/database";
import { Network } from "@prisma/client";

export async function createWifi(userId: number){

    const wifi = await prisma.network.create({
        data: {
        title:  faker.internet.userName(),
        network:  faker.internet.userName(),
        password:  faker.internet.password(10),
        userId: userId,

        }
    });

    return wifi;
 
    }