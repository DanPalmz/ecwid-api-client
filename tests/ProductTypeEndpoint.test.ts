import { EcwidApi } from "../src";
import { ecwidConfig } from "./getEnvironment";
import { getSampleData } from "./getHelpers";
import { ProductTypeEndpoint as Endpoint } from "../src/endpoints/ProductTypesEndpoint";

test("if environment is valid", () => {
  expect(ecwidConfig.apiStoreId).toBeDefined();
  expect(ecwidConfig.apiToken).toBeDefined();
});

// Compose Environment
const ecwid = new EcwidApi(ecwidConfig);
const endpoint = new Endpoint(ecwid);

// Per endpoint settings..
const sampleData: any = getSampleData("tests/samplejson/producttype.json");
const sampleSearchKey = "name";
const modifyValue = {
  attributes: [
    {
      name: "Test Update TS",
      type: "CUSTOM",
      show: "DESCR",
    },
  ],
};

const delay = () => new Promise((res) => setTimeout(res, 3000));

describe("endpoint: ProductTypeEndpoint", () => {
  test("has initiailised the EcwidApi", () => {
    expect(endpoint.api.apiStoreId).toEqual(ecwidConfig.apiStoreId);
  });

  test("will getAll items", async () => {
    const itemList = await endpoint.getAll();
    expect(itemList.length).toBeGreaterThanOrEqual(1);
  });

  test("will search for item and delete if it exists", async () => {
    const searchString = sampleData[sampleSearchKey];
    const itemList = await endpoint.getAll();

    const item = itemList.find((item) => {
      return item.name === searchString;
    });

    if (item) {
      const itemId = item.id;
      expect(typeof itemId).toEqual("number");

      const deleteResult = await endpoint.delete(itemId);
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
    const itemList = await endpoint.getAll();

    const item = itemList.find((item) => {
      return item.name === searchString;
    });

    const itemId = item?.id;

    if (itemId) {
      const updateResult = await endpoint.update(itemId, modifyValue);

      expect(updateResult.updateCount).toEqual(1);
      if (updateResult.updateCount == 1) {
        const confirmItem = await endpoint.getById(itemId);

        expect(
          confirmItem?.attributes?.some(({ name }) => name === "Test Update TS")
        ).toBe(true);
      }
    }
  });
});
