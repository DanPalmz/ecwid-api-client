import EcwidApi from "../src/ecwid-api";
import Product from "../src/endpoints/products";

const dotenv = require("dotenv").config();

if (dotenv.error) {
  throw dotenv.error;
}
if (!process.env.API_TOKEN || !process.env.API_STORE) {
  throw "Environment not defined.";
}

const apiToken = process.env.API_TOKEN;
const apiStoreId = process.env.API_STORE;

const ecwid = new EcwidApi(apiToken, apiStoreId);
const products = new Product(ecwid);

(async () => {
  const sampleProductId = await getSampleProduct();
  console.log(sampleProductId);

  if (sampleProductId) {
    console.log(`Item exists ${sampleProductId} - deleting:`);
    const deleteResult = await deleteSampleProduct(sampleProductId);
    console.log(deleteResult);
  } else {
    console.log(`Item doesn't exist ${sampleProductId} - adding:`);
    addSampleProduct();
    //console.log(addResult);
  }
})();

async function deleteSampleProduct(item: number): Promise<any> {
  let response = await products.delete(item);

  if (!(response.status === 200)) {
    throw "Couldn't delete item";
  }
  return response.data;
}

function addSampleProduct(): void {
  const fs = require("fs");

  fs.readFile("./tests/samplejson/product.json", (err: any, data: any) => {
    if (err) throw err;
    const product = JSON.parse(data);

    products
      .add(product)
      .then((response) => console.log("Add product result", response.data.id));
  });
}

async function getSampleProduct(): Promise<number | null> {
  let response = await products.getByKeyword("000012199");

  if (response.status === 200 && response.data.items.length == 1) {
    return response.data.items[0].id;
  }

  return null;
}

// products.getAll()
//   .then(data => console.log("GetAll", data.total));

// const search = { 'keyword': 'SAMPLE' }
// products.getByParams(search)
//     .then(data => console.log("ByParams", data));
