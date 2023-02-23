import {  Request, Response } from "express";
import { credentialSchemma } from "../models/credential.model";
import credentialServices from "../services/credential.service";
import httpStatus from "http-status";



export async function createCredential(req: Request, res: Response, next: any){
    const body = req.body;
    const userId = Number(req.body.userId)
    const validate = credentialSchemma.validate(body);

    if(validate.error){
      res.status(401).send(validate.error.details[0].message);
    }
    try{
    await credentialServices.createCredential(userId, body);
    return res.sendStatus(httpStatus.OK);
    }catch(err){
        if(err.message === "conflict"){ 
          return res.sendStatus(httpStatus.CONFLICT)
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }


}

export async function getCredentials(req: Request, res: Response, next: any) {
  const userId = Number(req.body.userId)
  if(!userId){
    res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  try{
   const credentials =  await credentialServices.getCredentials(userId);
    return res.status(httpStatus.OK).json(credentials);
    }catch(err){
        if(err.message === "not found"){
          return res.sendStatus(httpStatus.NOT_FOUND);
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}

export async function getCredentialById(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(req.body.userId)
  if(!userId){
    res.sendStatus(httpStatus.UNAUTHORIZED);
    }
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

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}

export async function deleteCredential(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(req.body.userId)
  if(!userId){
    res.sendStatus(httpStatus.UNAUTHORIZED);
    }
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