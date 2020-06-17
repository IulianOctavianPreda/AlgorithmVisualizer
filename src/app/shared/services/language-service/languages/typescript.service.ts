import { Injectable } from "@angular/core";
import { IInputBase } from "src/app/shared/types/base/input-base";
import { CompilerOptions, ModuleKind, ModuleResolutionKind, ScriptTarget, transpile as tsTranspile } from "typescript";

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

  public run(code: string, data: IInputBase): void {
    this.javascriptService.run(this.transpile(code), data);
  }
}
