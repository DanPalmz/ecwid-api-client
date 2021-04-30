export class EcwidApiValidator {
  public isApiTokenValid(api_token: string): boolean {
    const tokenTypes: Array<string> = ["secret_", "public_"];
    return tokenTypes.some((tokenType) => api_token.startsWith(tokenType));
  }

  public isStoreIdValid(store_id: string): boolean {
    return this.isStringInt(store_id);
  }

  public isStringInt(str: string): boolean {
    const regEx = RegExp("^\\d+$");
    return regEx.test(str);
  }

  public getStringOfItemIfInt(item: string | number): string {
    if (typeof item === "number") {
      if (Number.isInteger(item)) {
        return item.toString();
      }
      throw "Not a valid integer!";
    }

    if (this.isStringInt(item)) {
      return item;
    }

    throw "Value of string is not a valid integer!";
  }
}
