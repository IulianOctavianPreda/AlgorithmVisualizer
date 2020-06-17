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

export function enumToObject<E>(enumObj: any): E {
  const obj = {};
  Object.keys(enumObj).map((key) => {
    Object.assign(obj, {
      [enumObj[key]]: key,
    });
  });
  return obj as E;
}
