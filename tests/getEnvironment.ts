const dotenv = require("dotenv").config();

if (dotenv.error) {
  throw dotenv.error;
}
if (!process.env.API_TOKEN || !process.env.API_STORE) {
  throw "Environment not defined.";
}

export const apiToken = process.env.API_TOKEN;
export const apiStoreId = process.env.API_STORE;
