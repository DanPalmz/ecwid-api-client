import { EcwidApiInterface, IsEndpoint } from "../interfaces";
import { GetAll, GetById, GetByParams } from "./mixins";

class OrdersEndpoint implements IsEndpoint {
  endpoint: string = "orders";

  constructor(public readonly api: EcwidApiInterface) {}
}

//export class Orders extends GetAll(GetById(GetByParams(OrdersEndpoint))) {}

//export default Orders;
