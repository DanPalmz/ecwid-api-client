import EcwidApi from "./ecwid-api";
import Products from "./endpoints/products";
import Orders from "./endpoints/orders";

export class Ecwid {
  readonly api: EcwidApi;
  public readonly products: Products;
  public readonly orders: Orders;

  constructor(apiToken: string, apiStoreId: string) {
    this.api = new EcwidApi(apiToken, apiStoreId);

    //this.coupons = new Coupons(this.api);
    //this.customers =new Customers(this.api);
    this.orders = new Orders(this.api);
    this.products = new Products(this.api);
    //this.producttypes = new ProductTypes(this.api);
  }
}

export default Ecwid;
