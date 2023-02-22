import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
dotenv.config();

export function generateAccessToken(email: string) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '10000s' });
  }


export function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.body.user = user

    next()
  })
}