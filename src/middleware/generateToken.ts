import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import userRepository from "../repositories/user.repository";
dotenv.config();

export async function generateAccessToken(email: string) {
  const objEmail = { email };
    const token = jwt.sign(objEmail, process.env.TOKEN_SECRET, { expiresIn: '10000s' });
    
    return token;
  }


export async function authenticateToken(req: Request, res: Response, next: any) {
  const token = (req.headers.authorization)?.split(" ")[1];
  if(!token){
    res.sendStatus(401);
  }
  

  if (token == null) throw new Error("unauthorized");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err: any, user: any) => {
   

    if (err) return res.sendStatus(403)
    const userr = await userRepository.getUserByEmail(user.email);
    if(!userr){
     throw new Error("unauthorized");
    }

    res.locals.userId = userr?.id

    next()
  })
}