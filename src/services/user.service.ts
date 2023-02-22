import { UserInput } from "../protocols.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";
import { generateAccessToken} from "../middleware/generateToken.js";


async function signUp(body: UserInput){
const {email, password} = body;
const hashPassword = await bcrypt.hash(password,10);
const isEmail = await userRepository.getUserByEmail(email);

if (isEmail) {
  throw new Error("conflict");
  }
 

await userRepository.signUp({email, hashPassword});
}
async function signIn(body: UserInput){
  const {email, password} = body;
  const isEmail = await userRepository.getUserByEmail(email);
  const noHash = await bcrypt.compare(password, isEmail.password); 

  
  if (!isEmail || !noHash) {
    throw new Error("unauthorized");
    }
   
    
    const token = generateAccessToken(email);
    console.log(token);
    return token;
    
  }

const userServices = {
    signUp,
    signIn
};

export default userServices; 