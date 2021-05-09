import { EcwidApiValidator } from "../src/EcwidApiValidator";

const ecwidApiValidator = new EcwidApiValidator();

test("validates token starts with secret_ or public_", () => {
  expect(ecwidApiValidator.isApiTokenValid("secret_12345ABC")).toEqual(true);
  expect(ecwidApiValidator.isApiTokenValid("public_12345ABC")).toEqual(true);
  expect(ecwidApiValidator.isApiTokenValid("my_12345ABC")).toEqual(false);
});

test("validates storeIds must be in number format", () => {
  expect(ecwidApiValidator.isStoreIdValid("123456")).toEqual(true);
  expect(ecwidApiValidator.isStoreIdValid("")).toEqual(false);
  expect(ecwidApiValidator.isStoreIdValid("123.456")).toEqual(false);
  expect(ecwidApiValidator.isStoreIdValid("1234abc")).toEqual(false);
});
