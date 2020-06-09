import { Injectable } from "@angular/core";
import {
  CompilerOptions,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
  transpile as tsTranspile,
} from "typescript";

import { JavascriptService } from "./javascript.service";

@Injectable({
  providedIn: "root",
})
export class TypescriptService {
  private config: CompilerOptions = {
    allowJs: true,
    alwaysStrict: true,
    checkJs: true,
    target: ScriptTarget.ES2015,
    module: ModuleKind.ES2015,
    moduleResolution: ModuleResolutionKind.Classic,
  };

  constructor(private javascriptService: JavascriptService) {}

  public transpile(code: string): string {
    return tsTranspile(code, this.config);
  }

  public run(code: string): void {
    this.javascriptService.run(this.transpile(code));
  }
}
