
import prisma from "../config/database.js";
import { WifiInsert } from "../protocols.js";


async function getWifiById(id: number){
  return await prisma.network.findUnique({
    where: {
      id
    }
  });
}

async function deleteWifi(id: number){
  return await prisma.network.delete({
    where: {
      id
    }
  });
}
async function createWifi(body: WifiInsert){
  return await prisma.network.create({
    data: {
      title: body.title,
      network: body.network,
      password: body.password,
      userId: body.userId
    }
  });
}

async function getWifis(userId: number){
  return await prisma.network.findMany({
    where: {
      userId
    }
  });
}

const wifiRepository = {
    createWifi,
    getWifis,
    getWifiById,
    deleteWifi
};

export default wifiRepository;