
import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './routes/user.router.js'
import credentialRouter from "./routes/credential.router.js";
import wifiRouter from "./routes/wifi.router.js";
import { authenticateToken } from "./middleware/generateToken.js";
dotenv.config();


const app = express();
app
.use(cors())
.use(express.json())
.use(userRouter)
.use(authenticateToken)
.use(credentialRouter)
.use(wifiRouter)




const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});



  
