import {Router} from "express";
import {createWifi, getWifis, getWifiById, deleteWifi} from "../controllers/wifi.controller"

const wifiRouter = Router();

wifiRouter.post("/wifi", createWifi)
wifiRouter.get("/wifi", getWifis)
wifiRouter.get("/wifi/:id", getWifiById)
wifiRouter.delete("/wifi/:id", deleteWifi)
export default wifiRouter;