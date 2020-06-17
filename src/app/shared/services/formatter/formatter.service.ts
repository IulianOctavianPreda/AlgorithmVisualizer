import { Injectable } from "@angular/core";

import { LanguageOption } from "../../enums/language";
import { TypescriptFormatterService } from "./formatters/typescript-formatter.service";

@Injectable({
  providedIn: "root",
})
export class FormatterService {
  constructor(private ts: TypescriptFormatterService) {}

  public format(code: string, language: LanguageOption): string {
    if (language === LanguageOption.Javascript || LanguageOption.Typescript) {
      return this.ts.format(code);
    }
    return ""; // placeholder for now
  }
}
