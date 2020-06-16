import { CategoryKeys } from "../enums/category";
import { LanguageKeys } from "../enums/language";

type CategoryAlgorithm = {
  [key in CategoryKeys]?: IAlgorithm[]; // To be changed to programmatically be of the PathfindAlgorithm, SortAlgorithm etc.
};

type ScriptedAlgorithm = {
  [key in LanguageKeys]?: () => string;
};

export interface IAlgorithm extends ScriptedAlgorithm {
  //   type: LanguageKeys | "nativeFunction";
  name: string;
  nativeFunction: Function;
}
