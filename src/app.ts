
import express from "express";
import "express-async-errors";
import cors from "cors";
import userRouter from './routes/user.router'
import credentialRouter from "./routes/credential.router";
import wifiRouter from "./routes/wifi.router";
import { authenticateToken } from "./middleware/generateToken";



const app = express();
app
.use(cors())
.use(express.json())
.use(userRouter)
.use(authenticateToken)
.use(credentialRouter)
.use(wifiRouter)

export default app;


  
