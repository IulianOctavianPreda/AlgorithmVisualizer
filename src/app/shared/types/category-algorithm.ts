import { CategoryKeys } from "../enums/category-option";
import { IAlgorithmBase } from "./base/algorithm-base";

export type CategoryAlgorithm = {
  [key in CategoryKeys]?: IAlgorithmBase[];
};

export interface ICategoryAlgorithm extends CategoryAlgorithm {}
