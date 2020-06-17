import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { IOutputBase } from "../types/base/output-base";

@Injectable({
  providedIn: "root",
})
export class ResultManagementService {
  public codeResults$ = new BehaviorSubject<IOutputBase>(null);

  constructor() {}
}
