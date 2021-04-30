import { IsEndpoint, Type } from "../interfaces";
import { joinEndpoint } from "./endpointUtils";

export function Add<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async add(item: any): Promise<any> {
      return this.api.postRequest(this.endpoint, item);
    }
  };
}

export function Delete<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async delete(item_id: string | number): Promise<any> {
      const endpointWithItem: string = joinEndpoint(
        this.endpoint,
        this.api.validator.getStringOfItemIfInt(item_id)
      );

      return this.api.deleteRequest(endpointWithItem);
    }
  };
}

export function Update<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async update(item_id: string | number, item: any): Promise<any> {
      const endpointWithItem: string = joinEndpoint(
        this.endpoint,
        this.api.validator.getStringOfItemIfInt(item_id)
      );

      return this.api.putRequest(endpointWithItem, item);
    }
  };
}

export function GetAll<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async getAll() {
      return this.api.getRequest(this.endpoint);
    }
  };
}

export function GetByKeyword<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async getByKeyword(
      keyword: string
      //collateItems?: boolean
    ): Promise<any> {
      const params = { keyword: keyword };
      return this.api.getRequest(this.endpoint, new URLSearchParams(params));
    }
  };
}

export function GetById<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async getById(
      item_id: string | number
      //collateItems?: boolean
    ): Promise<any> {
      const endpointWithItem: string = joinEndpoint(
        this.endpoint,
        this.api.validator.getStringOfItemIfInt(item_id)
      );

      return this.api.getRequest(endpointWithItem);
    }
  };
}

export function GetByParams<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async getByParams(
      params: Record<string, string>
      //collateItems?: boolean
    ): Promise<any> {
      return this.api.getRequest(this.endpoint, new URLSearchParams(params));
    }
  };
}
