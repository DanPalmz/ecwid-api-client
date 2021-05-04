import { EcwidApiValidator } from "./EcwidApiValidator";

export declare const Type: FunctionConstructor;

export type Type<T> = new (...args: any[]) => T;

export type RequestParameters = Record<string, any>;
// Future - specific instead of any??
// export type RequestParameters = {
//   keyword?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   createdFrom?: number
//   createdTo?: number
// }

export type ItemValues = Record<string, any>;

export interface IsEndpoint {
  endpoint: string;
  readonly api: EcwidApiInterface;
}

export interface EcwidConfig {
  apiToken: string;
  apiStoreId: string | number;
  apiCustomBaseUrl?: string;
}

export interface EcwidApiInterface {
  validator: EcwidApiValidator;
  apiStoreId: string;

  getRequest(endpoint: string, payload?: RequestParameters): Promise<object>;

  deleteRequest(endpoint: string): Promise<object>;

  postRequest(endpoint: string, values: any): Promise<object>;

  putRequest(endpoint: string, values: any): Promise<object>;
}
