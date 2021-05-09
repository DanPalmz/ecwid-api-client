import { EcwidApi } from "../src";
import { ecwidConfig } from "./getEnvironment";
import { getSampleData } from "./getHelpers";
import { OrderEndpoint as Endpoint } from "../src/endpoints/OrderEndpoint";

test("if environment is valid", () => {
  expect(ecwidConfig.apiStoreId).toBeDefined();
  expect(ecwidConfig.apiToken).toBeDefined();
});

// Compose Environment
const ecwid = new EcwidApi(ecwidConfig);
const endpoint = new Endpoint(ecwid);

// Per endpoint settings..
const sampleData: any = getSampleData("tests/samplejson/order.json");
const modifyValue = { email: "newemail@example.com" };
const delay = () => new Promise((res) => setTimeout(res, 3000));

describe("endpoint: OrderEndpoint", () => {
  test("has initiailised the EcwidApi", () => {
    expect(endpoint.api.apiStoreId).toEqual(ecwidConfig.apiStoreId);
  });

  test("will getAll items", async () => {
    const itemList = await endpoint.getAll();
    expect(itemList).toHaveProperty("total");
  });

  test("will search by a parameter", async () => {
    const itemList = await endpoint.getByParams({ totalFrom: 100 });
    expect(itemList).toHaveProperty("total");
  });

  test.skip("will add, modifiy and delete a sample order", async () => {
    const result = await endpoint.add(sampleData);
    const itemId = result.id;

    expect(typeof itemId).toEqual("number");

    // Pause before fetching
    await delay();

    if (itemId) {
      // Update Item
      const updateResult = await endpoint.update(itemId, modifyValue);
      expect(updateResult.updateCount).toEqual(1);

      if (updateResult.updateCount == 1) {
        const confirmItem = await endpoint.getById(itemId);
        expect(confirmItem).toMatchObject(modifyValue);
      }

      // Delete Item
      const deleteResult = await endpoint.delete(itemId);
      expect(deleteResult.deleteCount).toEqual(1);
    }
  });
});
