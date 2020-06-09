import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

import { JavascriptInterpreterService } from "../../interpreter-services/javascript-interpreter.service";
import { TypescriptService } from "../../language-services/typescript.service";

@Component({
  selector: "app-code-editor-base",
  templateUrl: "./code-editor-base.component.html",
  styleUrls: ["./code-editor-base.component.scss"],
})
export class CodeEditorBaseComponent implements OnInit, OnChanges {
  @Input() initialCode: string;
  @Input() language: string;
  @Input() theme: string;

  public editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    formatOnType: true,
    minimap: { enabled: false },
  };

  public code: string;

  constructor(
    private typescriptService: TypescriptService,
    private jsInterpreter: JavascriptInterpreterService
  ) {
    // console.log(
    //   this.typescriptService.run(`var a = 2;
    // function b(){
    // return a + 2;}
    // b(); `)
    // );
    this.jsInterpreter
      .interpret(
        `var a = 2;
    function main(){
    return a + 2;}
     `
      )
      .subscribe((x) => console.log(x));
  }

  public ngOnInit(): void {
    this.code = this.initialCode;
    this.editorOptions.language = this.language ?? "javascript";
    this.editorOptions.theme = this.theme ?? "vs-dark";
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.initialCode?.currentValue !== this.initialCode) {
      this.code = changes.initialCode.currentValue;
    }
    if (changes?.language?.currentValue !== this.language) {
      this.editorOptions.language = changes.language.currentValue;
    }
    if (changes?.theme?.currentValue !== this.theme) {
      this.editorOptions.theme = changes.theme.currentValue;
    }
  }
}
