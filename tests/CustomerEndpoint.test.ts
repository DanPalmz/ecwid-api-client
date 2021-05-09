import { Customer, EcwidApi, Person } from "../src";
import { ecwidConfig } from "./getEnvironment";
import { CustomerEndpoint as Endpoint } from "../src/endpoints/CustomerEndpoint";

test("if environment is valid", () => {
  expect(ecwidConfig.apiStoreId).toBeDefined();
  expect(ecwidConfig.apiToken).toBeDefined();
});

// Compose Environment
const ecwid = new EcwidApi(ecwidConfig);
const endpoint = new Endpoint(ecwid);

// Per endpoint settings..
const modifyValue = {
  email: "notsotesty@example.com",
};

const delay = () => new Promise((res) => setTimeout(res, 3000));

describe("endpoint: CustomerEndpoint", () => {
  test("has initiailised the EcwidApi", () => {
    expect(endpoint.api.apiStoreId).toEqual(ecwidConfig.apiStoreId);
  });

  test("will getAll items", async () => {
    const itemList = await endpoint.getAll();
    expect(itemList.total).toBeGreaterThanOrEqual(1);
  });

  test("will create a sample customer, update it and remove it", async () => {
    const sampleCustomer = getSampleCustomer();

    const createStatus = await endpoint.add(sampleCustomer);
    expect(typeof createStatus.id).toEqual("number");

    const customerId = createStatus.id;

    // Pause before fetching
    await delay();

    if (customerId) {
      const updateResult = await endpoint.update(customerId, modifyValue);

      expect(updateResult.updateCount).toEqual(1);
      if (updateResult.updateCount == 1) {
        const confirmItem = await endpoint.getById(customerId);

        expect(confirmItem).toMatchObject(modifyValue);

        const deleteResult = await endpoint.delete(customerId);
        expect(deleteResult.deleteCount).toEqual(1);
      }
    }
  });
});

function getSampleCustomer(): Customer {
  const samplePerson = getSamplePerson();

  return {
    name: samplePerson.name,
    email: "testy@example.com",
    billingPerson: samplePerson,
    shippingAddresses: [samplePerson],
    acceptMarketing: false,
  };
}

function getSamplePerson(): Person {
  return {
    name: "Testy McTest",
    street: "123 Test St",
    city: "Queanbeyan",
    countryCode: "AU",
    countryName: "Australia",
    postalCode: "2620",
    stateOrProvinceCode: "NSW",
    stateOrProvinceName: "New South Wales",
    phone: "555-746",
  };
}
