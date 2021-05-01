import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { EcwidApiValidator } from "./EcwidApiValidator";
import { EcwidApiInterface, EcwidConfig } from "./interfaces";
import { SearchResult } from "./EcwidTypes";

export class EcwidApi implements EcwidApiInterface {
  readonly apiBaseUrl: string;
  public readonly apiToken;
  public readonly apiStoreId;
  validator: EcwidApiValidator;
  readonly httpClient: AxiosInstance;
  readonly apiPageLimit: string = "100";

  constructor({ apiToken, apiStoreId, apiBaseUrl }: EcwidConfig) {
    this.validator = new EcwidApiValidator();

    if (!this.validator.isApiTokenValid(apiToken)) {
      throw new Error("apiToken is not in a valid format");
    }
    this.apiToken = apiToken;
    this.apiStoreId = this.validator.getStringOfItemIfInt(apiStoreId);

    this.apiBaseUrl = apiBaseUrl
      ? apiBaseUrl
      : `https://app.ecwid.com/api/v3/${this.apiStoreId}/`;

    // if (!this.validator.isStoreIdValid(apiStoreId)) {
    //   throw new Error("apiStoreId is not in a valid number");
    // }

    this.httpClient = this.createHttpClient(this.apiBaseUrl);
  }

  async getRequest<T>(endpoint: string, payload?: URLSearchParams): Promise<T> {
    if (!payload) {
      payload = new URLSearchParams();
    }
    payload.set("token", this.apiToken);
    payload.set("limit", this.apiPageLimit);

    try {
      const response: AxiosResponse<T> = await this.httpClient.get<T>(
        endpoint,
        { params: payload }
      );
      return response.data;
    } catch (err) {
      console.error(`Error fetching ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async deleteRequest(endpoint: string): Promise<object> {
    const payload = this.getAuthPayload();

    try {
      return await this.httpClient.delete(endpoint, {
        params: payload,
      });
    } catch (err) {
      console.error(`Error deleting ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async postRequest(endpoint: string, values: any): Promise<object> {
    const payload = this.getAuthPayload();

    try {
      return await this.httpClient.post(endpoint, values, {
        params: payload,
      });
    } catch (err) {
      console.error(`Error posting item to ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  async putRequest(endpoint: string, values: any): Promise<object> {
    const payload = this.getAuthPayload();

    try {
      return await this.httpClient.put(endpoint, values, {
        params: payload,
      });
    } catch (err) {
      console.error(`Error updating ${endpoint} with ${err.message}`);
      throw err;
    }
  }

  private createHttpClient(baseUrl: string): AxiosInstance {
    const httpConfig: AxiosRequestConfig = {
      baseURL: baseUrl,
    };
    return axios.create(httpConfig);
  }

  private getAuthPayload() {
    return new URLSearchParams({ token: this.apiToken });
  }
}

//export default EcwidApi;
