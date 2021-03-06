import { EcwidApi } from "../src";
import { ecwidConfig } from "./getEnvironment";
import { getSampleData, getSampleItemIdOrNull } from "./getHelpers";
import { ProductEndpoint as Endpoint } from "../src/endpoints/ProductEndpoint";

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

  test("will search by a parameter", async () => {
    const itemList = await endpoint.getByParams({ dateFrom: "2010-01-01" });
    //console.log(`items created since 2010: ${itemList.total}`);
    expect(itemList).toHaveProperty("total");
  });

  test("will search for item and delete if it exists", async () => {
    const searchString = sampleData[sampleSearchKey];
    const itemId = await getSampleItemIdOrNull(endpoint, searchString);

    if (itemId) {
      expect(typeof itemId).toEqual("number");

      const deleteResult = await endpoint.delete(itemId);
      // console.log(deleteResult.deleteCount);
      expect(deleteResult.deleteCount).toEqual(1);
    }
  });

  test("will add sample item to store", async () => {
    const result = await endpoint.add(sampleData);
    expect(typeof result.id).toEqual("number");
  });

  test("will modify data for item", async () => {
    // Pause before fetching
    await delay();

    const searchString = sampleData[sampleSearchKey];
    const itemId = await getSampleItemIdOrNull(endpoint, searchString);

    expect(itemId).toBeDefined();

    if (itemId) {
      const updateResult = await endpoint.update(itemId, modifyValue);
      //console.log(updateResult);

      expect(updateResult.updateCount).toEqual(1);
      if (updateResult.updateCount == 1) {
        const confirmItem = await endpoint.getById(itemId);
        expect(confirmItem).toMatchObject(modifyValue);
      }
    }
  });
});
