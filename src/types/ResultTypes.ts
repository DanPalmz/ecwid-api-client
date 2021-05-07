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
  orderId?: string;
}

// export interface CreateStatusOrder extends CreateStatus {
//   orderId?: string;
// }
