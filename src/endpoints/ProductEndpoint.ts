import { EcwidApiInterface, IsEndpoint, Type } from "../interfaces";
import { Product, SearchResult } from "../EcwidTypes";
import { joinEndpoint } from "./endpointUtils";
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

// export function GetTest<R>() {
//   return function <T extends Type<IsEndpoint>>(base: T) {
//     return class extends base {
//       public async getByKeyword(
//         keyword: string
//         //collateItems?: boolean
//       ): Promise<SearchResult<R>> {
//         const params = { keyword: keyword };
//         //@ts-ignore
//         return this.api.getRequest<SearchResult<R>>(
//           this.endpoint,
//           new URLSearchParams(params)
//         );
//       }
//
//       public async getAll(): Promise<SearchResult<R>> {
//         //@ts-ignore
//         return this.api.getRequest<SearchResult<R>>(this.endpoint);
//       }
//
//       public async getById(
//         item_id: string | number
//         //collateItems?: boolean
//       ): Promise<R> {
//         const endpointWithItem: string = joinEndpoint(
//           this.endpoint,
//           this.api.validator.getStringOfItemIfInt(item_id)
//         );
//
//         //@ts-ignore
//         return this.api.getRequest<R>(endpointWithItem);
//       }
//     };
//   };
// }

// Various test bits
//export class ProductEndpoint extends GetAll(GetById(GetByKeyword(GetByParams(ProductsEndpoint)))) {};
//export class ProductEndpoint extends GetAll(ProductsEndpoint){}
//export default ProductEndpoint;

//export class ProductEndpoint extends GetTest<Product>()(ProductsEndpoint) {}

export class GetProducts extends GetAll<Product>()(
  GetById<Product>()(
    GetByKeyword<Product>()(GetByParams<Product>()(ProductsEndpoint))
  )
) {}

export class ProductEndpoint extends Add(Update(Delete(GetProducts))) {}
