import { EcwidApiValidator } from "./ecwid-api-validator";
import { AxiosInstance } from "axios";

export declare const Type: FunctionConstructor;

export type Type<T> = new (...args: any[]) => T;

// export interface EcwidEndpointProperties {
//     api: EcwidApi,
//     validator: EcwidApiValidator
// }

export interface IsEndpoint {
  endpoint: string;
  readonly api: EcwidApiInterface;
}

export interface EcwidApiInterface {
  validator: EcwidApiValidator;

  getRequest(endpoint: string, payload?: URLSearchParams): Promise<object>;
}

export interface EcwidApiInterface {
  apiBaseUrl: string;
  validator: EcwidApiValidator;
  httpClient: AxiosInstance;
  apiPageLimit: string;
  apiToken: string;
  apiStoreId: string;

  getRequest(endpoint: string, payload?: URLSearchParams): Promise<object>;

  deleteRequest(endpoint: string): Promise<object>;

  postRequest(endpoint: string, values: any): Promise<object>;

  putRequest(endpoint: string, values: any): Promise<object>;

  //private createHttpClient(baseUrl: string): AxiosInstance;
}
