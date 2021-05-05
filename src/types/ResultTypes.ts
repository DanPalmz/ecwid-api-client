export interface SearchResult<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: T[];
}

export interface DeleteStatus {
  deleteCount: number;
}

export interface UpdateStatus {
  updateCount: number;
}

export interface CreateStatus {
  id: number;
}

export interface CreateStatusOrder extends CreateStatus {
  orderId?: string;
}

// const myTestSearch: SearchResult<Partial<ProductTypes>> = {
//   total: 1,
//   count: 1,
//   offset: 0,
//   limit: 100,
//   items: [{ created: "123" }],
// };
