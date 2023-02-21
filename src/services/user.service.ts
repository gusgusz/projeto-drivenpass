import { UserInput } from "../protocols.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

async function signUp(body: UserInput){
const {email, password} = body;
const hashPassword = await bcrypt.hash(password,10);
const isEmail = await userRepository.getUserByEmail(email);

if (isEmail) {
  throw new Error("conflict");
  }
 

await userRepository.signUp({email, hashPassword});
}

const userServices = {
    signUp
};

export default userServices; 