import { enumToArray } from "../helpers/enum-helper";

export enum LanguageOption {
  Python = "python",
  Javascript = "javascript",
  Typescript = "typescript",
}

export interface ILanguage {
  id: LanguageOption;
  name: LanguageKeys;
}

export type LanguageKeys = keyof typeof LanguageOption;
export const Languages = enumToArray<ILanguage>(LanguageOption);
