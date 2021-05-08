import { EcwidApi } from "./EcwidApi";
import { EcwidConfig } from "./interfaces";
import { OrderEndpoint } from "./endpoints/OrderEndpoint";
import { ProductEndpoint } from "./endpoints/ProductEndpoint";
import { ProductTypeEndpoint } from "./endpoints/ProductTypesEndpoint";
import { CustomerEndpoint } from "./endpoints/CustomerEndpoint";

export class Ecwid {
  readonly api: EcwidApi;
  public readonly customers: CustomerEndpoint;
  public readonly orders: OrderEndpoint;
  public readonly products: ProductEndpoint;
  public readonly producttypes: ProductTypeEndpoint;

  constructor(ecwidProperties: EcwidConfig) {
    this.api = new EcwidApi(ecwidProperties);

    //this.coupons = new Coupons(this.api);
    this.customers = new CustomerEndpoint(this.api);
    this.orders = new OrderEndpoint(this.api);
    this.products = new ProductEndpoint(this.api);
    this.producttypes = new ProductTypeEndpoint(this.api);
  }
}
