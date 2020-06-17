import { Injectable } from "@angular/core";

import { LanguageOption } from "../../enums/language-option";
import { TypescriptService } from "./languages/typescript.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private ts: TypescriptService) {}
  run(code: string, language: LanguageOption) {
    if (language === LanguageOption.Javascript || LanguageOption.Typescript) {
      this.ts.run(code);
    }
  }
}
