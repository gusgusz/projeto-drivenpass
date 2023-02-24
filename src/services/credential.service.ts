import { UserInput } from "../protocols";

import credentialRepository from "../repositories/credential.repository";
import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const cryptr = new Cryptr(secret);

async function createCredential(userId: number ,body: UserInput){

const isTitle = await credentialRepository.getCredentialByTitle( body.title);

if (isTitle && isTitle.userId === userId) {
  console.log("aquiii16");
  throw new Error("conflict");
  }
  body.password = cryptr.encrypt(body.password);
 

await credentialRepository.createCredential({userId, ...body});
}

async function getCredentials(userId: number){
  const credentials = await credentialRepository.getCredentials(userId);
  
  if(!credentials || credentials.length === 0){
    throw new Error("not found");

  }
  const newCredentials = [];

   credentials.forEach(async (credential) => {
        credential.password =cryptr.decrypt(credential.password);
        
        newCredentials.push(credential);
        
    });
    
    
  return newCredentials;
}

async function getCredentialById(id: number, userId: number){
  const credential = await credentialRepository.getCredentialById(id);
  if(!credential){
    throw new Error("not found");
  }
  if(credential.userId !== userId){
    throw new Error("unauthorized");
    }
    credential.password = cryptr.decrypt(credential.password);
  return credential;
}

async function deleteCredential(id: number, userId: number){
  const credential = await credentialRepository.getCredentialById(id);
  if(!credential){
    throw new Error("not found");
  }
  if(credential.userId !== userId){
    throw new Error("unauthorized");
    }
  await credentialRepository.deleteCredential(id);
}
const credentialServices = {
    createCredential,
    getCredentials,
    getCredentialById,
    deleteCredential
};

export default credentialServices;