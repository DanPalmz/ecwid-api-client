import { Ecwid } from "./Ecwid";
import { ecwidConfig } from "../tests/getEnvironment";
import { Product, SearchResult } from "./EcwidTypes";

test("test environment valid", () => {
  expect(ecwidConfig.apiStoreId).toBeDefined();
  expect(ecwidConfig.apiToken).toBeDefined();
});

test("will initiailise api", () => {
  const ecwid = new Ecwid(ecwidConfig);
  expect(ecwid.api.apiStoreId).toEqual(ecwidConfig.apiStoreId);
});

test("will return products", async () => {
  const ecwid = new Ecwid(ecwidConfig);
  const productList: SearchResult<Product> = await ecwid.products.getAll();
  expect(productList).toHaveProperty("total");
});
