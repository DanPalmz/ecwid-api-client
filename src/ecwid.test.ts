import Ecwid from "./ecwid";
import { apiStoreId, apiToken } from "../tests/getEnvironment";

test("test environment valid", () => {
  expect(apiStoreId).toBeDefined();
  expect(apiToken).toBeDefined();
});

test("will initiailise api", () => {
  const ecwid = new Ecwid(apiToken, apiStoreId);
  expect(ecwid.api.apiStoreId).toEqual(apiStoreId);
});

test("will return products", async () => {
  const ecwid = new Ecwid(apiToken, apiStoreId);
  const productList: any = await ecwid.products.getAll();
  expect(productList.data).toHaveProperty("total");
});
