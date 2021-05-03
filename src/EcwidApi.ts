import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { EcwidApiValidator } from "./EcwidApiValidator";
import {
  EcwidApiInterface,
  EcwidConfig,
  RequestParameters,
} from "./interfaces";
import { DeleteStatus, UpdateStatus } from "./EcwidTypes";

export class EcwidApi implements EcwidApiInterface {
  public readonly apiStoreId;
  private readonly apiPageLimit: string = "100";
  private readonly httpClient: AxiosInstance;

  validator: EcwidApiValidator;

  constructor({ apiToken, apiStoreId, apiCustomBaseUrl }: EcwidConfig) {
    this.validator = new EcwidApiValidator();

    if (!this.validator.isApiTokenValid(apiToken)) {
      throw new Error("apiToken is not in a valid format");
    }

    this.apiStoreId = this.validator.getStringOfItemIfInt(apiStoreId);

    const apiBaseUrl = apiCustomBaseUrl
      ? apiCustomBaseUrl
      : `https://app.ecwid.com/api/v3/${this.apiStoreId}/`;

    // if (!this.validator.isStoreIdValid(apiStoreId)) {
    //   throw new Error("apiStoreId is not in a valid number");
    // }

    this.httpClient = this.createHttpClient(apiBaseUrl, apiToken);
  }

  async getRequest<T>(
    endpoint: string,
    payload?: RequestParameters
  ): Promise<T> {
    try {
      const requestPayload: RequestParameters = payload
        ? { params: payload }
        : {};

      const response: AxiosResponse<T> = await this.httpClient.get<T>(
        endpoint,
        requestPayload
      );

      return response.data;
    } catch (err) {
      console.error(`Error fetching ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async deleteRequest(endpoint: string): Promise<DeleteStatus> {
    try {
      const response: AxiosResponse<DeleteStatus> = await this.httpClient.delete<DeleteStatus>(
        endpoint
      );
      return response.data;
    } catch (err) {
      console.error(`Error deleting ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async postRequest(endpoint: string, values: any): Promise<object> {
    try {
      return await this.httpClient.post(endpoint, values);
    } catch (err) {
      console.error(`Error posting item to ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async putRequest(endpoint: string, values: any): Promise<UpdateStatus> {
    try {
      const response: AxiosResponse<UpdateStatus> = await this.httpClient.put<UpdateStatus>(
        endpoint,
        values
      );
      return response.data;
    } catch (err) {
      console.error(`Error updating ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  private createHttpClient(baseUrl: string, apiToken: string): AxiosInstance {
    const httpConfig: AxiosRequestConfig = {
      baseURL: baseUrl,
      params: this.getDefaultRequestParams(apiToken),
    };
    return axios.create(httpConfig);
  }

  private getDefaultRequestParams(apiToken: string): RequestParameters {
    return {
      token: apiToken,
      limit: this.apiPageLimit,
    };
  }
}

//export default EcwidApi;
