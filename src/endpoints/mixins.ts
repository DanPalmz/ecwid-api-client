import { IsEndpoint, ItemValues, RequestParameters, Type } from "../interfaces";
import { joinEndpoint } from "./endpointUtils";
import {
  CreateStatus,
  DeleteStatus,
  SearchResult,
  UpdateStatus,
} from "../types";

export type Mixins =
  | "Add"
  | "Delete"
  | "Update"
  | "GetAll"
  | "GetAllAsItemArray" // Used for ProductTypes
  | "GetByKeyword"
  | "GetById"
  | "GetByParams";

// Notes on Generics Used:
// <R>:  Item type to add / update / return (ProductTypes, Order etc).
// <T>:  Endpoint class to which we are adding this Mixin..
// Eg: GetAll<R> adds getAll(): R to endpoint T.

export function Add<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async add(item: Partial<R>): Promise<CreateStatus> {
        // Note may need to override this fn to make
        // it CreateStatusOrders for Orders.
        // @ts-ignore
        return this.api.postRequest<CreateStatus>(this.endpoint, item);
      }
    };
  };
}

export function Delete<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async delete(item_id: string | number): Promise<DeleteStatus> {
      const endpointWithItem: string = joinEndpoint(
        this.endpoint,
        this.api.validator.getStringOfItemIfInt(item_id)
      );

      // @ts-ignore
      return this.api.deleteRequest(endpointWithItem);
    }
  };
}

export function Update<T extends Type<IsEndpoint>>(base: T) {
  return class extends base {
    public async update(
      item_id: string | number,
      item: ItemValues
    ): Promise<UpdateStatus> {
      const endpointWithItem: string = joinEndpoint(
        this.endpoint,
        this.api.validator.getStringOfItemIfInt(item_id)
      );

      // @ts-ignore
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

export function GetAllAsItemArray<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getAll(): Promise<R[]> {
        //@ts-ignore
        return this.api.getRequest<R[]>(this.endpoint);
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
        const params: RequestParameters = { keyword: keyword };
        //@ts-ignore
        return this.api.getRequest<SearchResult<R>>(this.endpoint, params);
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
}

export function GetByParams<R>() {
  return function <T extends Type<IsEndpoint>>(base: T) {
    return class extends base {
      public async getByParams(
        params: RequestParameters
        //collateItems?: boolean
      ): Promise<SearchResult<R>> {
        //@ts-ignore
        return this.api.getRequest<SearchResult<R>>(this.endpoint, params);
      }
    };
  };
}
