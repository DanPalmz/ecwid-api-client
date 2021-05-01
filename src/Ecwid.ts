import { EcwidApi } from "./EcwidApi";
import { ProductEndpoint } from "./endpoints/ProductEndpoint";
//import { Orders } from "./endpoints/orders";
import { EcwidConfig } from "./interfaces";

export class Ecwid {
  readonly api: EcwidApi;
  public readonly products: ProductEndpoint;

  //public readonly orders: Orders;

  constructor(ecwidProperties: EcwidConfig) {
    this.api = new EcwidApi(ecwidProperties);

    //this.coupons = new Coupons(this.api);
    //this.customers =new Customers(this.api);
    //this.orders = new Orders(this.api);
    this.products = new ProductEndpoint(this.api);
    //this.producttypes = new ProductTypes(this.api);
  }
}
