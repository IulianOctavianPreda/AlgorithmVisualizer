import { Injectable } from "@angular/core";

import { LanguageOption } from "../../enums/language-option";
import { IInputBase } from "./../../types/base/input-base";
import { TypescriptService } from "./languages/typescript.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private ts: TypescriptService) {}
  run(code: string, language: LanguageOption, data: IInputBase) {
    if (language === LanguageOption.Javascript || LanguageOption.Typescript) {
      this.ts.run(code, data);
    }
  }
}
