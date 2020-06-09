import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

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
export class CodeEditorBaseComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  @Input() language: string;
  @Input() theme: string;

  private _code: string;
  public editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    formatOnType: true,
    minimap: { enabled: false },
  };

  constructor() {}

  public ngOnInit(): void {
    this.editorOptions.language = this.language ?? this.editorOptions.language;
    this.editorOptions.theme = this.theme ?? this.editorOptions.theme;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.language?.currentValue !== this.language) {
      this.editorOptions.language = changes.language.currentValue;
      // monaco.editor.setModelLanguage(changes.language.currentValue);
    }
    if (changes?.theme?.currentValue !== this.theme) {
      this.editorOptions.theme = changes.theme.currentValue;
      // monaco.editor.setTheme(changes.theme.currentValue);
    }
  }

  public get code(): string {
    return this._code;
  }
  public set code(v: string) {
    if (v !== this._code) {
      this._code = v;
      this.onChange(v);
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
