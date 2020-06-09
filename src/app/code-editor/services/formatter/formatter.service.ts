import { Injectable } from "@angular/core";

import { TypescriptFormatterService } from "./formatters/typescript-formatter.service";

@Injectable({
  providedIn: "root",
})
export class FormatterService {
  constructor(private ts: TypescriptFormatterService) {}

  public format(code: string, language: string) {
    return this.ts.format(code);
  }
}
