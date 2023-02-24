import {  Request, Response } from "express";
import { wifiSchemma } from "../models/wifi.model";
import wifiServices from "../services/wifi.service";
import httpStatus from "http-status";



export async function createWifi(req: Request, res: Response, next: any){
    const body = req.body;
    const userId = Number(res.locals.userId);
    const validate = wifiSchemma.validate(body);

    if(validate.error){
      res.status(401).send(validate.error.details[0].message);
    }
    try{
    await wifiServices.createWifi(userId, body);
    return res.sendStatus(httpStatus.OK);
    }catch(err){
      
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }


}

export async function getWifis(req: Request, res: Response, next: any) {
  const userId = Number(res.locals.userId);

  try{
   const wifis =  await wifiServices.getWifis(userId);
    return res.status(httpStatus.OK).json(wifis);
    }catch(err){
      if(err.message === "not found"){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

        return res.sendStatus(err);

    }

}

export async function getWifiById(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId);
 
  try{
   const wifi =  await wifiServices.getWifiById(id, userId);
    return res.status(httpStatus.OK).json(wifi);
    }catch(err){

      if(err.message === "not found"){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      if(err.message === "unauthorized"){
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
     res.sendStatus(err);

     
    }

}

export async function deleteWifi(req: Request, res: Response, next: any) {
  const id = Number(req.params.id);
  const userId = Number(res.locals.userId);

  try{
   await wifiServices.deleteWifi(id, userId);
    return res.sendStatus(httpStatus.OK);
    }catch(err){

      if(err.message === "not found"){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      res.sendStatus(err);
    }

}