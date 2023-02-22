import {Router} from "express";
import {createCredential, getCredentials, getCredentialById, deleteCredential} from "../controllers/credential.controller.js"

const credentialRouter = Router();

credentialRouter.post("/credential", createCredential)
credentialRouter.get("/credential", getCredentials)
credentialRouter.get("/credential/:id", getCredentialById)
credentialRouter.delete("/credential/:id", deleteCredential)
export default credentialRouter;