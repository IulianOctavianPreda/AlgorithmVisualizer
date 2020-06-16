import { enumToArray } from "../helpers/enum-helper";

export enum Language {
  Python = "Python",
  Javascript = "Javascript",
  Typescript = "Typescript",
}
export type LanguageKeys = keyof typeof Language;

export const Languages = enumToArray(Language);
