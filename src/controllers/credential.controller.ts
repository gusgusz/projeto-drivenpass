import {  Request, Response } from "express";
import { credentialSchemma } from "../models/credential.model";
import credentialServices from "../services/credential.service";
import httpStatus from "http-status";



export async function createCredential(req: Request, res: Response, next: any){
    const body = req.body;
    const userId = res.locals.userId;
    const validate = credentialSchemma.validate(body);

    if(validate.error){
      res.status(401).send(validate.error.details[0].message);
    }
    try{
    await credentialServices.createCredential(userId, body);
     res.sendStatus(httpStatus.OK);
    }catch(err){
        if(err.message === "conflict"){ 
          res.sendStatus(httpStatus.CONFLICT);
        }

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }


}

export async function getCredentials(req: Request, res: Response, next: any) {
  const userId = Number(res.locals.userId);
  try{
   const credentials =  await credentialServices.getCredentials(userId);
  
   res.status(httpStatus.OK).send(credentials);
    }catch(err){
        if(err.message === "not found"){
         res.sendStatus(httpStatus.NOT_FOUND);
        }

        if(err.message === "unauthorized"){
          res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}

export async function getCredentialById(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId);
 
  try{
   const credential =  await credentialServices.getCredentialById(id, userId);
    return res.status(httpStatus.OK).json(credential);
    }catch(err){
        if(err.message === "not found"){
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if(err.message === "unauthorized"){
          return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

       
    }

}

export async function deleteCredential(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId)
 
  try{
   await credentialServices.deleteCredential(id, userId);
    return res.sendStatus(httpStatus.OK);
    }catch(err){
        if(err.message === "not found"){
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if(err.message === "unauthorized"){
          return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}