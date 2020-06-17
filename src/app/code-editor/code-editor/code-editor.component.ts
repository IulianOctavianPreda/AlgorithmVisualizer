import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LanguageOption, Languages } from "src/app/shared/enums/language-option";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";

import { FormatterService } from "../../shared/services/formatter/formatter.service";
import { LanguageService } from "../../shared/services/language-service/language.service";
import { IAlgorithmBase } from "../../shared/types/base/algorithm-base";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
})
export class CodeEditorComponent implements OnInit {
  public formGroup: FormGroup;
  public error: string = null;
  public languages = Languages;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private formatterService: FormatterService,
    private stateManager: StateManagementService
  ) {
    console.log(Languages);
    this.formGroup = this.formBuilder.group({
      language: Languages.find((x) => LanguageOption.Typescript === x.id), // TODO update from behavioural subject
      algorithm: null as IAlgorithmBase,
      code: "",
    });

    this.stateManager.codeResults$.subscribe((data) => {
      if (data?.error) {
        this.error = data.error.message;
      }
    });
  }

  ngOnInit(): void {}

  get language() {
    return this.formGroup.value.language;
  }

  format() {
    const code = this.formGroup.get("code");
    const language = this.formGroup.get("language");
    const formattedCode = this.formatterService.format(
      code.value,
      language.value.id
    );
    code.setValue(formattedCode);
  }

  run() {
    const formGroup = this.formGroup.value;
    this.languageService.run(formGroup.code, formGroup.language.id);
  }
}
