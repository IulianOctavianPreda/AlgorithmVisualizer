import { enumToArray } from "../helpers/enum-helper";

export enum LanguageOption {
  Python = "python",
  Javascript = "javascript",
  Typescript = "typescript",
}

export type LanguageKeys = keyof typeof LanguageOption;

export interface ILanguage {
  id: LanguageOption;
  name: LanguageKeys;
}

export const Languages = enumToArray<ILanguage>(LanguageOption);
