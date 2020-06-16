import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public code$ = new BehaviorSubject<any>(null);
  public selectedLanguage$ = new BehaviorSubject<any>(null);
  public selectedAlgorithm$ = new BehaviorSubject<any>(null);
  public selectedCategory$ = new BehaviorSubject<any>(null);

  constructor() {}
}
