import { UserInput } from "../protocols";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import { generateAccessToken} from "../middleware/generateToken";


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
  if(!isEmail){
    throw new Error("unauthorized");
  }
  const noHash = await bcrypt.compare(password, isEmail.password); 

  
  if (!noHash) {
    throw new Error("unauthorized");
    }
   
    
    const token =await generateAccessToken(email);
  
    return token;
    
  }

const userServices = {
    signUp,
    signIn
};

export default userServices; 