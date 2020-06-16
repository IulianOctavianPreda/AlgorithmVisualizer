export interface EnumItem {
  id: string;
  code: string;
}

export function enumToArray<E = EnumItem>(
  enumObj: any,
  enumKey = "id",
  enumContent = "code"
): E[] {
  return Object.keys(enumObj).map((key) => ({
    [enumKey]: key,
    [enumContent]: enumObj[key],
  })) as E[];
}
