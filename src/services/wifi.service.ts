import { UserInput } from "../protocols";

import wifiRepository from "../repositories/wifi.repository";
import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const cryptr = new Cryptr(secret);

async function createWifi(userId: number ,body: UserInput){



  body.password = cryptr.encrypt(body.password);
 

await wifiRepository.createWifi({userId, ...body});
}

async function getWifis(userId: number){
  const wifis = await wifiRepository.getWifis(userId);
  
 
  const newwifis = [];

  

    for(let wifi of wifis){
      newwifis.push({
        title: wifi.title,
        network: wifi.network,
        password: cryptr.decrypt(wifi.password),
        userId: wifi.userId

      });
    }
    
    
  return newwifis;
}

async function getWifiById(id: number, userId: number){
  const wifi = await wifiRepository.getWifiById(id);
  if(!wifi){
    throw new Error("not found");
  }
  if(wifi.userId !== userId){
    throw new Error("unauthorized");
    }
    wifi.password = cryptr.decrypt(wifi.password);
  return wifi;
}

async function deleteWifi(id: number, userId: number){
  const wifi = await wifiRepository.getWifiById(id);
  if(!wifi){
    throw new Error("not found");
  }
  if(wifi.userId !== userId){
    throw new Error("unauthorized");
    }
  await wifiRepository.deleteWifi(id);
}
const wifiServices = {
    createWifi,
    getWifis,
    getWifiById,
    deleteWifi
};

export default wifiServices;