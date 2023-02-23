import {Router} from "express";
import {signUp, signIn} from "../controllers/user.controller"

const userRouter = Router();

userRouter.post("/sign-up", signUp)
userRouter.post("/sign-in", signIn)
export default userRouter;