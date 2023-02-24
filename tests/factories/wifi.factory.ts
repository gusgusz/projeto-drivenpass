import {faker} from "@faker-js/faker";
import prisma from "../database";
import { Network } from "@prisma/client";

export async function createWifi(userId: number){

    return await prisma.network.create({
        data: {
        title:  faker.internet.userName(),
        network:  faker.internet.userName(),
        password:  faker.internet.password(10),
        userId

        }
    });

  
 
    }