import { Injectable } from "@angular/core";

import { Language } from "../../enums/language";
import { JavascriptInterpreterService } from "./interpreters/javascript-interpreter.service";

@Injectable({
  providedIn: "root",
})
export class InterpreterService {
  constructor(private js: JavascriptInterpreterService) {}

  interpret(code: string, language: Language): void {
    if (language === Language.Javascript) {
      this.js.interpret(code);
    }
  }
}
