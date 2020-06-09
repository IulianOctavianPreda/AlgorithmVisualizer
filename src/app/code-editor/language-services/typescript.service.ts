import { Injectable } from "@angular/core";
import * as ts from "typescript";

import { JavascriptService } from "./javascript.service";

@Injectable({
  providedIn: "root",
})
export class TypescriptService {
  private config: ts.CompilerOptions = {
    allowJs: true,
    alwaysStrict: true,
    checkJs: true,
    target: ts.ScriptTarget.ES5,
  };

  constructor(private javascriptService: JavascriptService) {}

  public transpile(code: string) {
    return ts.transpile(code, this.config);
  }

  public run(code: string) {
    this.javascriptService.run(this.transpile(code));
  }
}
