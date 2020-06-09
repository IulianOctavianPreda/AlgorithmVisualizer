import { Injectable } from "@angular/core";

import { TypescriptService } from "./languages/typescript.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private ts: TypescriptService) {}
  run(code: string, language: string) {
    this.ts.run(code);
  }
}
