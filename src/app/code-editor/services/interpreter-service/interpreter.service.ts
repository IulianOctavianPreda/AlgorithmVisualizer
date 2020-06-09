import { Injectable } from "@angular/core";

import { JavascriptInterpreterService } from "./interpreters/javascript-interpreter.service";

@Injectable({
  providedIn: "root",
})
export class InterpreterService {
  constructor(private js: JavascriptInterpreterService) {}

  interpret(code: string, language: string) {
    this.js.interpret(code);
  }
}
