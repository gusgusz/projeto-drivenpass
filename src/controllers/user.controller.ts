import { json, Request, Response } from "express";
import { userSchemma } from "../models/user.model.js";
import userServices from "../services/user.service.js";
import httpStatus from "http-status";



export async function signUp(req: Request, res: Response, next: any){
    const body = req.body;
    const validate = userSchemma.validate(body);

    if(validate.error){
      res.status(401).send(validate.error.details[0].message);
    }
    try{
    await userServices.signUp(body);
    return res.sendStatus(httpStatus.OK);
    }catch(err){
        if(err.message === "conflict"){ 
          return res.sendStatus(httpStatus.CONFLICT)
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }


}

export async function signIn(req: Request, res: Response, next: any) {
  const body = req.body;
  const validate = userSchemma.validate(body);

  if(validate.error){
    res.status(401).send(validate.error.details[0].message);
  }

  try{
   const token =  await userServices.signIn(body);
    return res.status(httpStatus.OK).json(token);
    }catch(err){
        if(err.message === "unauthorized"){
          return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}