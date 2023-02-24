import {Router} from "express";
import {createWifi, getWifis, getWifiById, deleteWifi} from "../controllers/wifi.controller"
import { authenticateToken } from "../middleware/generateToken";

const wifiRouter = Router();

wifiRouter.use(authenticateToken)
wifiRouter.post("/wifi", createWifi)
wifiRouter.get("/wifi", getWifis)
wifiRouter.get("/wifi/:id", getWifiById)
wifiRouter.delete("/wifi/:id", deleteWifi)
export default wifiRouter;