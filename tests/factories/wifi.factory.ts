import {faker} from "@faker-js/faker";
import prisma from "../../src/config/database";
import { Network } from "@prisma/client";

export async function createWifi(userId: number): Promise<Network>{

    const wifi = await prisma.network.create({
        data: {
        title:  faker.internet.userName(),
        network:  faker.internet.userName(),
        password:  faker.internet.password(6),
        userId: userId,

        },
    });

    return wifi;
 
    }