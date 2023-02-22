import joi from "joi";
import {WifiInput} from "../protocols.js";

export const wifiSchemma = joi.object<WifiInput>({
    title: joi.string().required(),
    network: joi.string().required(),
    password: joi.string().required()
});
