import { Injectable } from "@angular/core";

import { JavascriptInterpreterService } from "./../interpreter-services/javascript-interpreter.service";

@Injectable({
  providedIn: "root",
})
export class JavascriptService {
  constructor(private jsInterpreter: JavascriptInterpreterService) {}

  public run(code: string): any {
    return this.jsInterpreter.interpret(code);
  }
}
