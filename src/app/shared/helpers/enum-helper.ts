export interface EnumItem {
  id: string;
  name: string;
}

export function enumToArray<E = EnumItem>(
  enumObj: any,
  enumKey = "id",
  enumContent = "name"
): E[] {
  return Object.keys(enumObj).map((key) => ({
    [enumKey]: enumObj[key],
    [enumContent]: key,
  })) as E[];
}
