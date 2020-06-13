import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CodeJar } from "codejar";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";

@Component({
  selector: "app-code-editor-base",
  templateUrl: "./code-editor-base.component.html",
  styleUrls: ["./code-editor-base.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorBaseComponent),
      multi: true,
    },
  ],
})
export class CodeEditorBaseComponent implements OnInit, AfterViewInit {
  @ViewChild("editor") editor: ElementRef;

  @Input() language: string;

  public codeEditor: CodeJar = null;
  private _code: string;

  constructor() {}

  public ngOnInit(): void {
    this.registerLanguages();
  }

  public ngAfterViewInit(): void {
    this.codeEditor = CodeJar(this.editor.nativeElement, this.highlight, {
      tab: " ".repeat(4),
    });

    this.codeEditor.onUpdate((code) => {
      this._code = code;
      this.onChange(code);
    });
  }

  private highlight(editor: HTMLElement) {
    editor.textContent = editor.textContent;
    hljs.highlightBlock(editor);
  }

  private registerLanguages() {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("python", python);
  }

  public get code(): string {
    return this._code;
  }

  public set code(v: string) {
    if (v !== this._code) {
      this._code = v;
      this.onChange(v);
      if (!!this.codeEditor) {
        this.codeEditor.updateCode(v);
      }
    }
  }

  onChange = (_) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.code = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
