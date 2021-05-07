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

* customers

```
  * add(Partial<Customer>) => CreateStatus
  * delete(customerId) => DeleteStatus
  * getAll() => SearchResult<Customer>  (result.items contains customer array);
  * getById(customerId) => Customer
  * getByKeyword("keyword") => SearchResult<Customer>
  * getByParams({keyword: "keyword"}) => SearchResult<Customer>
  * update(Partial<Customer>) => UpdateStatus  
```

* orders
* products
* producttypes


