import { SearchResult } from "../src/EcwidTypes";

export function getSampleData(filename: string): object {
  const fs = require("fs");

  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

export async function getSampleItemIdOrNull<T>(
  endpoint: any,
  searchString: string
): Promise<number | null> {
  //@ts-ignore
  const result: SearchResult<T> = await endpoint.getByKeyword(searchString);

  if (result.count === 0) {
    return null;
  }
  if (result.count === 1) {
    //@ts-ignore
    return result.items[0].id;
  }
  throw new Error(`Error with search by ${searchString}:  ${result}`);
}
