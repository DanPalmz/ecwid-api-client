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

class ProductsEndpoint implements IsEndpoint {
  endpoint: string = "products";

  constructor(public readonly api: EcwidApiInterface) {}
}

//export class Products extends GetAll(GetById(GetByKeyword(GetByParams(ProductsEndpoint)))) {};
export class GetProducts extends GetAll(
  GetById(GetByKeyword(GetByParams(ProductsEndpoint)))
) {}

export class Products extends Add(Update(Delete(GetProducts))) {}

export default Products;
