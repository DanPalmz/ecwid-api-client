import { EcwidApiInterface, IsEndpoint } from "../interfaces";
import {
  Add,
  Delete,
  GetAll,
  GetById,
  GetByKeyword,
  GetByParams,
  Update,
} from "./mixins";
import { Customer } from "../types";

// const mixinList: Mixins[] = [
//   "Add",
//   "Update",
//   "Delete",
//   "GetAll",
//   "GetById",
//   "GetByKeyword",
//   "GetByParams",
// ];

class CustomersEndpoint implements IsEndpoint {
  endpoint: string = "customers";

  constructor(public readonly api: EcwidApiInterface) {}
}

export class GetCustomers extends GetAll<Customer>()(
  GetById<Customer>()(
    GetByKeyword<Customer>()(GetByParams<Customer>()(CustomersEndpoint))
  )
) {}

export class CustomerEndpoint extends Add<Customer>()(
  Update(Delete(GetCustomers))
) {}
