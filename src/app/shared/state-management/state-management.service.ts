import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Language } from "../enums/language";
import { Category } from "./../enums/category";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public codeResults$ = new BehaviorSubject<any>(null);
  public selectedLanguage$ = new BehaviorSubject<Language>(null);
  public selectedAlgorithm$ = new BehaviorSubject<Algorithm>(null);
  public selectedCategory$ = new BehaviorSubject<Category>(null);

  constructor() {
    this.selectedCategory$.subscribe((x) => {
      if (x === Category.Pathfind) {
      }
    });
  }
}

// array de algoritmi per categorie
// export toTs toJs per algoritm
// enum cu ts/ fct/ js per algoritm
// array facut din enumuri
