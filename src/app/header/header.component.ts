import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ResultManagementService } from "../shared/state-management/result-management.service";
import { StateManagementService } from "../shared/state-management/state-management.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public error: string = null;
  public availableLanguages = [];
  public availableAlgorithms = [];
  // public availableCategories = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private stateManager: StateManagementService,
    private resultManager: ResultManagementService
  ) {
    this.formGroup = this.formBuilder.group({
      // category: null,
      language: null,
      algorithm: null,
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

    this.stateManager.selectedAlgorithm$.subscribe((x) => {
      if (algorithm.value !== x) {
        algorithm.patchValue(x);
      }
    });

    this.stateManager.selectedLanguage$.subscribe((x) => {
      if (language.value !== x) {
        language.patchValue(x);
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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  run() {
    this.stateManager.runCode$.next();
  }
}
