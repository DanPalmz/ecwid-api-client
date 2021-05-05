import { EcwidApiInterface, IsEndpoint } from "../interfaces";
import { Product } from "../types";
import {
  Add,
  Delete,
  GetAll,
  GetById,
  GetByKeyword,
  GetByParams,
  Update,
} from "./mixins";

// const mixinList: Mixins[] = [
//   "Add",
//   "Update",
//   "Delete",
//   "GetAll",
//   "GetById",
//   "GetByKeyword",
//   "GetByParams",
// ];

class ProductsEndpoint implements IsEndpoint {
  endpoint: string = "products";

  constructor(public readonly api: EcwidApiInterface) {}
}

export class GetProducts extends GetAll<Product>()(
  GetById<Product>()(
    GetByKeyword<Product>()(GetByParams<Product>()(ProductsEndpoint))
  )
) {}

export class ProductEndpoint extends Add<Product>()(
  Update(Delete(GetProducts))
) {}
