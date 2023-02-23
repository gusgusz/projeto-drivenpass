import prisma from "../config/database";
import { CredentialInsert } from "../protocols";

async function getCredentialByTitle(title: string){
  return await prisma.credential.findFirst({
    where: {
      title
    }
  });
}

async function getCredentialById(id: number){
  return await prisma.credential.findUnique({
    where: {
      id
    }
  });
}

async function deleteCredential(id: number){
  return await prisma.credential.delete({
    where: {
      id
    }
  });
}
async function createCredential(body: CredentialInsert){
  return await prisma.credential.create({
    data: {
      title: body.title,
      url: body.url,
      username: body.username,
      password: body.password,
      userId: body.userId
    }
  });
}

async function getCredentials(userId: number){
  return await prisma.credential.findMany({
    where: {
      userId
    }
  });
}

const credentialRepository = {
    getCredentialByTitle,
    createCredential,
    getCredentials,
    getCredentialById,
    deleteCredential
};

export default credentialRepository;