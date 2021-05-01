import { EcwidConfig } from "../src/interfaces";

const dotenv = require("dotenv").config();

if (dotenv.error) {
  throw dotenv.error;
}
if (!process.env.API_TOKEN || !process.env.API_STORE) {
  throw "Environment not defined.";
}

const apiToken = process.env.API_TOKEN;
const apiStoreId = process.env.API_STORE;

export const ecwidConfig: EcwidConfig = {
  apiToken: apiToken,
  apiStoreId: apiStoreId,
};
