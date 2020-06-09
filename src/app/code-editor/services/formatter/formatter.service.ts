import { Injectable } from "@angular/core";

import { Language } from "../../enums/language";
import { TypescriptFormatterService } from "./formatters/typescript-formatter.service";

@Injectable({
  providedIn: "root",
})
export class FormatterService {
  constructor(private ts: TypescriptFormatterService) {}

  public format(code: string, language: Language): string {
    if (language === Language.Javascript || Language.Typescript) {
      return this.ts.format(code);
    }
    return ""; // placeholder for now
  }
}
