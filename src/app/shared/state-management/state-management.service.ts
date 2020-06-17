import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { CategoryOption, ICategory } from "../enums/category-option";
import { ILanguage, Languages } from "../enums/language-option";
import { IAlgorithmBase } from "../types/base/algorithm-base";
import { IOutputBase } from "../types/base/output-base";
import { CategoryAlgorithms } from "./../algorithms/algorithms";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public selectedCategory$ = new BehaviorSubject<ICategory>(null);
  public selectedLanguage$ = new BehaviorSubject<ILanguage>(null);
  public selectedAlgorithm$ = new BehaviorSubject<IAlgorithmBase>(null);

  public codeResults$ = new BehaviorSubject<IOutputBase>(null);

  public availableAlgorithms$ = new BehaviorSubject<IAlgorithmBase[]>(null);
  public availableLanguages$ = new BehaviorSubject<ILanguage[]>(null);

  public code$ = new BehaviorSubject<IAlgorithmBase>(null);
  public grid$ = new BehaviorSubject<IAlgorithmBase>(null);

  constructor() {
    this.selectedCategory$.subscribe((category) => {
      if (!!category) {
        if (category.id === CategoryOption.Pathfind) {
          this.availableAlgorithms$.next(CategoryAlgorithms.Pathfind);
          this.selectedAlgorithm$.next(CategoryAlgorithms.Pathfind[0]);
        }
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
  }
}
