import { Injectable } from "@angular/core";
import { LanguageOption } from "src/app/shared/enums/language";

import { InterpreterService } from "../../interpreter-service/interpreter.service";

@Injectable({
  providedIn: "root",
})
export class JavascriptService {
  constructor(private interpreter: InterpreterService) {}

  public run(code: string): any {
    return this.interpreter.interpret(code, LanguageOption.Javascript);
  }
}
