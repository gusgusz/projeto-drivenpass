import {UserInput} from "../protocols.js"
import joi from "joi";

export const userSchemma = joi.object<UserInput>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});