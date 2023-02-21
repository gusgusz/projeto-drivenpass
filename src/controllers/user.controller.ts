import { Request, Response } from "express";
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