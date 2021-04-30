import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { EcwidApiValidator } from "./ecwid-api-validator";
import { EcwidApiInterface } from "./interfaces";

export class EcwidApi implements EcwidApiInterface {
  apiBaseUrl: string;
  validator: EcwidApiValidator;
  readonly httpClient: AxiosInstance;
  readonly apiPageLimit: string = "100";

  constructor(
    public apiToken: string,
    public apiStoreId: string,
    base_url?: string
  ) {
    this.validator = new EcwidApiValidator();
    this.apiBaseUrl = base_url
      ? base_url
      : `https://app.ecwid.com/api/v3/${apiStoreId}/`;

    if (!this.validator.isApiTokenValid(apiToken)) {
      throw new Error("apiToken is not in a valid format");
    }

    if (!this.validator.isStoreIdValid(apiStoreId)) {
      throw new Error("apiStoreId is not in a valid number");
    }

    this.httpClient = this.createHttpClient(this.apiBaseUrl);
  }

  async getRequest(
    endpoint: string,
    payload?: URLSearchParams
  ): Promise<object> {
    if (!payload) {
      payload = new URLSearchParams();
    }
    payload.set("token", this.apiToken);
    payload.set("limit", this.apiPageLimit);

    try {
      return this.httpClient.get(endpoint, { params: payload });
      //.then(res => res.data)
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

export default EcwidApi;
