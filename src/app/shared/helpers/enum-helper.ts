export interface EnumItem {
  key: string;
  name: string;
}

export function enumToArray<E = EnumItem>(
  enumObj: any,
  enumKey = "key",
  enumContent = "name"
): E[] {
  return Object.keys(enumObj).map((key) => ({
    [enumKey]: enumObj[key],
    [enumContent]: key,
  })) as E[];
}
