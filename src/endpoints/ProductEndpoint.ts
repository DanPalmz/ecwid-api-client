import { EcwidApiInterface, IsEndpoint } from "../interfaces";
import { Product } from "../types";
import {
  Add,
  Delete,
  GetAll,
  GetById,
  GetByKeyword,
  GetByParams,
  Mixins,
  Update,
} from "./mixins";

const mixinList: Mixins[] = [
  "Add",
  "Update",
  "Delete",
  "GetAll",
  "GetById",
  "GetByKeyword",
  "GetByParams",
];

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

// Various test bits
//export class ProductEndpoint extends GetAll(GetById(GetByKeyword(GetByParams(ProductsEndpoint)))) {};
//export class ProductEndpoint extends GetAll(ProductsEndpoint){}
//export default ProductEndpoint;

//export class ProductEndpoint extends GetTest<Product>()(ProductsEndpoint) {}
