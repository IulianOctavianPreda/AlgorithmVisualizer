import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { ICategory } from "../enums/category-option";
import { ILanguage, Languages } from "../enums/language-option";
import { LanguageService } from "../services/language-service/language.service";
import { IAlgorithmBase } from "../types/base/algorithm-base";
import { CategoryAlgorithms } from "./../algorithms/algorithms";
import { IInputBase } from "./../types/base/input-base";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public selectedCategory$ = new BehaviorSubject<ICategory>(null);
  public selectedLanguage$ = new BehaviorSubject<ILanguage>(null);
  public selectedAlgorithm$ = new BehaviorSubject<IAlgorithmBase>(null);

  public availableAlgorithms$ = new BehaviorSubject<IAlgorithmBase[]>(null);
  public availableLanguages$ = new BehaviorSubject<ILanguage[]>(null);

  public code$ = new BehaviorSubject<string>(null);
  public data$ = new BehaviorSubject<IInputBase>(null);

  public runCode$ = new Subject<void>();

  constructor(private languageService: LanguageService) {
    this.selectedCategory$.subscribe((category) => {
      if (!!category) {
        this.availableAlgorithms$.next(CategoryAlgorithms[category.name]);
        this.selectedAlgorithm$.next(CategoryAlgorithms[category.name][0]);
      }
    });

    this.selectedAlgorithm$.subscribe((algorithm) => {
      if (!!algorithm) {
        const availableLanguages = Languages.filter((lang) =>
          algorithm.availableLanguages.find((algLang) => algLang === lang.name)
        );
        this.availableLanguages$.next(availableLanguages);
        this.selectedLanguage$.next(availableLanguages[0]);
      }
    });

    this.runCode$.subscribe(() => {
      this.languageService.run(
        this.code$.value,
        this.selectedLanguage$.value.id,
        this.data$.value
      );
    });
  }
}
