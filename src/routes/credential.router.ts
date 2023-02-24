import {Router} from "express";
import {createCredential, getCredentials, getCredentialById, deleteCredential} from "../controllers/credential.controller"
import { authenticateToken } from "../middleware/generateToken";
const credentialRouter = Router();

credentialRouter.use(authenticateToken);
credentialRouter.post("/credential", createCredential)
credentialRouter.get("/credential", getCredentials)
credentialRouter.get("/credential/:id", getCredentialById)
credentialRouter.delete("/credential/:id", deleteCredential)
export default credentialRouter;