import { EcwidApi } from "../EcwidApi";
import { ecwidConfig } from "../../tests/getEnvironment";
import { getSampleData, getSampleItemIdOrNull } from "../../tests/getHelpers";
import { ProductEndpoint as Endpoint } from "./ProductEndpoint";
import { Product } from "../EcwidTypes";

test("if environment is valid", () => {
  expect(ecwidConfig.apiStoreId).toBeDefined();
  expect(ecwidConfig.apiToken).toBeDefined();
});

// Compose Environment
const ecwid = new EcwidApi(ecwidConfig);
const endpoint = new Endpoint(ecwid);

// Per endpoint settings..
const sampleData: any = getSampleData("tests/samplejson/product.json");
const sampleSearchKey = "sku";
const modifyValue = { name: "New Name" };
const delay = () => new Promise((res) => setTimeout(res, 3000));

describe("endpoint: ProductEndpoint", () => {
  test("has initiailised the EcwidApi", () => {
    expect(endpoint.api.apiStoreId).toEqual(ecwidConfig.apiStoreId);
  });

  test("will getAll items", async () => {
    const itemList = await endpoint.getAll();
    expect(itemList).toHaveProperty("total");
  });

  test("will search for item and delete if it exists", async () => {
    const searchString = sampleData[sampleSearchKey];
    const itemId = await getSampleItemIdOrNull(endpoint, searchString);

    if (itemId) {
      expect(typeof itemId).toEqual("number");

      const deleteResult = await endpoint.delete(itemId);
      // console.log(deleteResult.data);
      expect(deleteResult.deleteCount).toEqual(1);
    }
  });

  test("will add sample item to store", async () => {
    const result = await endpoint.add(sampleData);

    expect(result.status).toEqual(200);
    if (result.status == 200) {
      const itemId = result.data.id;

      expect(typeof itemId).toEqual("number");
    }
  });

  test("will modify data for item", async () => {
    // Pause before fetching
    await delay();

    const searchString = sampleData[sampleSearchKey];
    const itemId = await getSampleItemIdOrNull(endpoint, searchString);

    expect(typeof itemId).toEqual("number");

    if (itemId) {
      const updateResult = await endpoint.update(itemId, modifyValue);
      console.log(updateResult);

      expect(updateResult.updateCount).toEqual(1);
      if (updateResult.updateCount == 1) {
        const confirmItem = await endpoint.getById(itemId);
        expect(confirmItem).toMatchObject(modifyValue);
      }
    }
  });
});
