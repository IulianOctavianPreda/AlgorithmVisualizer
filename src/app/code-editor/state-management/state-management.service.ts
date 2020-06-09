import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateManagementService {
  public code$ = new BehaviorSubject<any>(null);

  constructor() {}
}
