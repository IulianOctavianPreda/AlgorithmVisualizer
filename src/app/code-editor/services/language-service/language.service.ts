import { Injectable } from "@angular/core";

import { Language } from "../../enums/language";
import { TypescriptService } from "./languages/typescript.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private ts: TypescriptService) {}
  run(code: string, language: Language) {
    if (language === Language.Javascript || Language.Typescript) {
      this.ts.run(code);
    }
  }
}
