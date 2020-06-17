import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";

import { FormatterService } from "../../shared/services/formatter/formatter.service";
import { ResultManagementService } from "./../../shared/state-management/result-management.service";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public error: string = null;
  public availableLanguages = [];
  public availableAlgorithms = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private formatterService: FormatterService,
    private stateManager: StateManagementService,
    private resultManager: ResultManagementService
  ) {
    this.formGroup = this.formBuilder.group({
      language: null,
      algorithm: null,
      code: "",
    });
  }

  ngOnInit(): void {
    this.resultManager.codeResults$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data?.error) {
          this.error = data.error.message;
        }
      });
    this.getAvailableResources();
    this.updateFormGroup();
    this.updateStateManager();
  }
  private updateFormGroup() {
    const algorithm = this.formGroup.get("algorithm");
    const language = this.formGroup.get("language");
    const code = this.formGroup.get("code");

    this.stateManager.selectedAlgorithm$.subscribe((x) => {
      if (algorithm.value !== x) {
        algorithm.patchValue(x);
      }
      if (!!algorithm.value && !!language.value) {
        code.patchValue(algorithm.value[language.value.name]);
      }
    });

    this.stateManager.selectedLanguage$.subscribe((x) => {
      if (language.value !== x) {
        language.patchValue(x);
      }
      if (!!algorithm.value && !!language.value) {
        code.patchValue(algorithm.value[language.value.name]);
      }
    });
  }

  private getAvailableResources() {
    this.stateManager.availableAlgorithms$
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.availableAlgorithms = x;
      });

    this.stateManager.availableLanguages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.availableLanguages = x;
      });
  }

  private updateStateManager() {
    this.formGroup
      .get("language")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.stateManager.selectedLanguage$.next(x);
      });

    this.formGroup
      .get("algorithm")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.stateManager.selectedAlgorithm$.next(x);
      });

    this.formGroup
      .get("code")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.stateManager.code$.next(x);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

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
    this.stateManager.runCode$.next();
  }
}
