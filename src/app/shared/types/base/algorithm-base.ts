import { LanguageKeys } from "../../enums/language-option";
import { IOutputBase } from "./output-base";

export type ScriptedAlgorithm = {
  [key in LanguageKeys]?: () => string;
};

export interface IAlgorithmBase extends ScriptedAlgorithm {
  name: string;
  availableLanguages: LanguageKeys[];
  nativeFunction: ({ data: IInput }) => IOutputBase;
}
