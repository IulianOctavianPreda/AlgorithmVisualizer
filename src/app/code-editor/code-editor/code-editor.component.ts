import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Language } from "../enums/language";
import { FormatterService } from "../services/formatter/formatter.service";
import { LanguageService } from "../services/language-service/language.service";
import { StateManagementService } from "./../state-management/state-management.service";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
})
export class CodeEditorComponent implements OnInit {
  formGroup: FormGroup;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private language: LanguageService,
    private formatter: FormatterService,
    private stateManager: StateManagementService
  ) {
    this.formGroup = this.formBuilder.group({
      language: null,
      theme: null,
      algorithm: null,
      code: null,
    });

    this.stateManager.code$.subscribe(
      (value) => console.log(value),
      (error) => (this.error = error.message)
    );
  }

  ngOnInit(): void {}
  format() {
    const code = this.formGroup.get("code");
    const formattedCode = this.formatter.format(
      code.value,
      Language.Typescript
    );
    code.setValue(formattedCode);
  }
  run() {
    const formGroup = this.formGroup.value;
    console.log(formGroup);
    console.log(window.monaco);
    console.log(monaco);
    this.language.run(formGroup.code, formGroup.language);
  }
}
