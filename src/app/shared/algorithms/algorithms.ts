import { CategoryKeys } from "../enums/category";
import { LanguageKeys } from "../enums/language";

type CategoryAlgorithm = {
  [key in CategoryKeys]?: any[]; // To be changed to programmatically be of the PathfindAlgorithm, SortAlgorithm etc.
};

type ScriptedAlgorithm = {
  [key in LanguageKeys]?: () => string;
};

export interface Algorithm extends ScriptedAlgorithm {
  type: LanguageKeys | "nativeFunction";
  nativeFunction: Function;
}
