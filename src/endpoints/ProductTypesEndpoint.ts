import { EcwidApiInterface, IsEndpoint } from "../interfaces";
import { ProductType } from "../types";
import { Add, Delete, GetAllAsItemArray, GetById, Update } from "./mixins";

// const mixinList: Mixins[] = ["Add", "Update", "Delete", "GetAll", "GetById"];

class ProductTypesEndpoint implements IsEndpoint {
  endpoint: string = "classes";

  constructor(public readonly api: EcwidApiInterface) {}
}

export class GetProductTypes extends GetAllAsItemArray<ProductType>()(
  GetById<ProductType>()(ProductTypesEndpoint)
) {}

export class ProductTypeEndpoint extends Add<ProductType>()(
  Update(Delete(GetProductTypes))
) {}
