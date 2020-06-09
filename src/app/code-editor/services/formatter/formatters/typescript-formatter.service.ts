import { Injectable } from "@angular/core";
import * as parserTs from "prettier/parser-typescript";
import * as prettier from "prettier/standalone";

@Injectable({
  providedIn: "root",
})
export class TypescriptFormatterService {
  constructor() {}

  format(code: string) {
    return prettier.format(code, {
      semi: true,
      parser: "typescript",
      plugins: [parserTs],
    });
  }
}
