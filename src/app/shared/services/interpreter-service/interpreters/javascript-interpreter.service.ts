import { Injectable } from "@angular/core";

import { ResultManagementService } from "./../../../state-management/result-management.service";
import { IInputBase } from "./../../../types/base/input-base";
import { AlgorithmInlineWorker } from "./../../../worker/algorithm-inline-worker";

@Injectable({
  providedIn: "root",
})
export class JavascriptInterpreterService {
  constructor(private resultManager: ResultManagementService) {}

  public interpret(code: string, data: IInputBase): void {
    const worker = new AlgorithmInlineWorker(code);
    worker.postMessage(data);
    worker.onMessage().subscribe((x) => {
      this.resultManager.codeResults$.next(x);
      worker.terminate();
    });
  }
}
