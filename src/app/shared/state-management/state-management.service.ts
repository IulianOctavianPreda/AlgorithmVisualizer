import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { CategoryOption } from "../enums/category-option";
import { LanguageOption } from "../enums/language-option";
import { IAlgorithmBase } from "../types/base/algorithm-base";
import { IPathfindOutput } from "../types/pathfind/pathfind-output";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public selectedCategory$ = new BehaviorSubject<CategoryOption>(null);
  public selectedLanguage$ = new BehaviorSubject<LanguageOption>(null);
  public selectedAlgorithm$ = new BehaviorSubject<IAlgorithmBase>(null);

  public codeResults$ = new BehaviorSubject<IPathfindOutput | any>(null);

  public availableAlgorithms$ = new BehaviorSubject<IAlgorithmBase[]>(null);
  public availableLanguages$ = new BehaviorSubject<LanguageOption[]>(null);
  public code$ = new BehaviorSubject<IAlgorithmBase>(null);
  public grid$ = new BehaviorSubject<IAlgorithmBase>(null);

  constructor() {
    //   this.selectedCategory$.subscribe((x) => {
    //     if (x === Category.Pathfind) {
    //       let languages = []
    //       PathfindAlgorithms.forEach(alg => Object.keys(alg).forEach(key => {
    //         if(Languages.find(x => x.name === key)
    //         )
    //       });)
    //       this.availableAlgorithms$.next(PathfindAlgorithms);
    //     }
    //   });
  }
}
