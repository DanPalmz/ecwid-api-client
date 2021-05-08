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
import { OrderEntry } from "../types";

class OrdersEndpoint implements IsEndpoint {
  endpoint: string = "orders";

  constructor(public readonly api: EcwidApiInterface) {}
}

export class GetOrdersEndpoints extends GetAll<OrderEntry>()(
  GetById<OrderEntry>()(
    GetByKeyword<OrderEntry>()(GetByParams<OrderEntry>()(OrdersEndpoint))
  )
) {}

export class OrderEndpoint extends Add<OrderEntry>()(
  Update(Delete(GetOrdersEndpoints))
) {}