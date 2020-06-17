import { enumToArray, enumToObject } from "../helpers/enum-helper";

export enum CategoryOption {
  Pathfind = "pathfind",
  Sort = "sort",
}

export type CategoryKeys = keyof typeof CategoryOption;

export interface ICategory {
  id: CategoryOption;
  name: CategoryKeys;
}

export type ICategoryObject = {
  [value in CategoryOption]: CategoryKeys;
};

export const Categories = enumToArray<ICategory>(CategoryOption);
export const CategoriesObject = enumToObject<ICategoryObject>(CategoryOption);
