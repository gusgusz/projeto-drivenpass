
import express from "express";
import "express-async-errors";
import cors from "cors";
import userRouter from './routes/user.router'
import credentialRouter from "./routes/credential.router";
import wifiRouter from "./routes/wifi.router";




const app = express();
app
.use(cors())
.use(express.json())
.use(userRouter)
.use(credentialRouter)
.use(wifiRouter)



export default app;


  
