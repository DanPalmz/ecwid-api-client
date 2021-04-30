export function getSampleData(filename: string): object {
  const fs = require("fs");

  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

export async function getSampleItemIdOrNull(
  endpoint: any,
  searchString: string
): Promise<number | null> {
  const result = await endpoint.getByKeyword(searchString);

  if (result.status == 200 && result.data.count > 0) {
    const item = result.data.items[0];
    //console.log(item);
    return item.id;
  }
  return null;
}
