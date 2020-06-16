import { enumToArray } from "../helpers/enum-helper";

export enum Language {
  Python = "Python",
  Javascript = "Javascript",
  Typescript = "Typescript",
}

export const Languages = enumToArray(Language);
