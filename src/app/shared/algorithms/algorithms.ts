import { CategoryOption } from "../enums/category-option";
import { IAlgorithmBase } from "../types/base/algorithm-base";
import { ICategoryAlgorithm } from "../types/category-algorithm";
import { CategoriesObject } from "./../enums/category-option";
import { PathfindAlgorithms } from "./pathfind/pathfind-algorithms";

export const Algorithms: IAlgorithmBase[] = [...PathfindAlgorithms];

export const CategoryAlgorithms: ICategoryAlgorithm = {
  [CategoriesObject[CategoryOption.Pathfind]]: [...PathfindAlgorithms],
};
