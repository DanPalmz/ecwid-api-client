import { IsEndpoint, Type } from "../interfaces";
import { joinEndpoint } from "./endpointUtils";
import { SearchResult } from "../EcwidTypes";

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

export function GetAll<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getAll(): Promise<SearchResult<R>> {
        //@ts-ignore
        return this.api.getRequest<SearchResult<R>>(this.endpoint);
      }
    };
  };
}

export function GetByKeyword<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getByKeyword(
        keyword: string
        //collateItems?: boolean
      ): Promise<SearchResult<R>> {
        const params = { keyword: keyword };
        //@ts-ignore
        return this.api.getRequest<SearchResult<R>>(
          this.endpoint,
          new URLSearchParams(params)
        );
      }
    };
  };
}

export function GetById<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getById(
          item_id: string | number
          //collateItems?: boolean
      ): Promise<R> {
        const endpointWithItem: string = joinEndpoint(
            this.endpoint,
            this.api.validator.getStringOfItemIfInt(item_id)
        );

        //@ts-ignore
        return this.api.getRequest<R>(endpointWithItem);
      }
    };
  };
};

export function GetByParams<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getByParams(
          params: Record<string, string>
          //collateItems?: boolean
      ): Promise<SearchResult<R>> {

        //@ts-ignore
        return this.api.getRequest<SearchResult<R>>(this.endpoint, new URLSearchParams(params));
      }
    };
  };
};
