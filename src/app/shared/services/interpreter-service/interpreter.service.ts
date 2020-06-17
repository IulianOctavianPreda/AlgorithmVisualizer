import { Injectable } from "@angular/core";

import { LanguageOption } from "../../enums/language-option";
import { JavascriptInterpreterService } from "./interpreters/javascript-interpreter.service";

@Injectable({
  providedIn: "root",
})
export class InterpreterService {
  constructor(private js: JavascriptInterpreterService) {}

  interpret(code: string, language: LanguageOption): void {
    if (language === LanguageOption.Javascript) {
      this.js.interpret(code);
    }
  }
}
