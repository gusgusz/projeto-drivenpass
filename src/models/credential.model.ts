import joi from "joi";
import {CredentialInput} from "../protocols.js";

export const credentialSchemma = joi.object<CredentialInput>({
    title: joi.string().required(),
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().min(6).required()
});
