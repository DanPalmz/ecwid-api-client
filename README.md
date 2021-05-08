# ecwid-api-client

Strongly typed TypeScript/JS client for the Ecwid REST API.

## Requirements

1. API token and Store ID from [Ecwid CP](https://my.ecwid.com/#develop-apps) Apps -> My Apps
2. Axios

### Sample Usage in JavaScript

```javascript
import {Ecwid} from "ecwid-api-client";

const ecwidConfig = {
  apiToken: "secret_12345",
  apiStoreId: "123456"
}

const ecwid = new Ecwid(ecwidConfig);

const productSearch = await ecwid.products.getAll();

if (productSearch.total > 0) {
  productSearch.items.forEach((product) =>
          console.log(product.name));
}
```

![Sample Tooling Example](./docs/CodePrompting.png?raw=true)

## List of endpoints and commands enabled:

```
* Ecwid.customers
    * add(Partial<Customer>) => CreateStatus
    * delete(customerId) => DeleteStatus
    * getAll() => SearchResult<OrderEntry>  (result.items contains customer array);
    * getById(customerId) => Customer
    * getByKeyword("keyword") => SearchResult<OrderEntry>
    * getByParams({keyword: "keyword"}) => SearchResult<OrderEntry>
    * update(Partial<OrderEntry>) => UpdateStatus  
* Ecwid.orders
    * add(Partial<OrderEntry>) => CreateStatus
    * delete(orderId) => DeleteStatus
    * getAll() => SearchResult<OrderEntry>  (result.items contains OrderEntry array);
    * getById(orderId) => OrderEntry
    * getByKeyword("keyword") => SearchResult<OrderEntry>
    * getByParams({keyword: "keyword"}) => SearchResult<OrderEntry>
    * update(Partial<OrderEntry>) => UpdateStatus
* Ecwid.products
    * add(Partial<Product>) => CreateStatus
    * delete(productId) => DeleteStatus
    * getAll() => SearchResult<Product>  (result.items contains Product array);
    * getById(productId) => Product
    * getByKeyword("keyword") => SearchResult<Product>
    * getByParams({keyword: "keyword"}) => SearchResult<Product>
    * update(Partial<Product>) => UpdateStatus
* Ecwid.producttypes
    * add(Partial<ProductType>) => CreateStatus
    * delete(ProductTypeId) => DeleteStatus
    * getAll() => ProductType[]  (result is an array of ProductTypes);
    * getById(typeId) => ProductType
    * update(Partial<ProductType>) => UpdateStatus
```

### To be completed:

* Check OrderID will work with "strings" returned - and accept them as input.
* Add product variations
* Add store detail access
* Add image uploading to various endpoints

