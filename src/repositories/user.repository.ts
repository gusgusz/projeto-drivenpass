import prisma from "../config/database.js";
import { UserInput } from "../protocols";

async function signUp({email, hashPassword} : UserInput){
    return await prisma.user.create({
     data: {
        email: email, 
        password: hashPassword
     }
    });
}

async function getUserByEmail(email : string){
    return await prisma.user.findUnique({
      where : {
        email
      }
    });
}



const userRepository = {
    signUp, 
    getUserByEmail
};

export default userRepository;

