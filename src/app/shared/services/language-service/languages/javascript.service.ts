import { Injectable } from "@angular/core";
import { LanguageOption } from "src/app/shared/enums/language-option";
import { IInputBase } from "src/app/shared/types/base/input-base";

import { InterpreterService } from "../../interpreter-service/interpreter.service";

@Injectable({
  providedIn: "root",
})
export class JavascriptService {
  constructor(private interpreter: InterpreterService) {}

  public run(code: string, data: IInputBase): any {
    return this.interpreter.interpret(code, LanguageOption.Javascript, data);
  }
}
