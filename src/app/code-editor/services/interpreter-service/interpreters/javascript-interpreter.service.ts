import { Injectable, OnDestroy } from "@angular/core";

import { StateManagementService } from "../../../state-management/state-management.service";

@Injectable({
  providedIn: "root",
})
export class JavascriptInterpreterService implements OnDestroy {
  private worker: Worker;
  private isWorkerAvailable = false;
  // private destroy$ = new Subject<boolean>();

  constructor(private stateManagement: StateManagementService) {
    if (typeof Worker !== "undefined") {
      this.isWorkerAvailable = true;

      this.worker = new Worker("./javascript-interpreter.worker", {
        type: "module",
      });
    }

    this.worker.onmessage = ({ data }) => {
      this.stateManagement.code$.next(data);
    };
    this.worker.onerror = (error) => {
      console.log(error);
      this.stateManagement.code$.error(error);
    };
  }

  public ngOnDestroy(): void {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
    this.worker.terminate();
  }

  public interpret(code: string): void {
    if (this.isWorkerAvailable) {
      this.worker.postMessage(code);
    } else {
      try {
        const responseFn = new Function(`${code} return main()`);
        this.stateManagement.code$.next(responseFn());
      } catch (error) {
        this.stateManagement.code$.error(error);
      }
    }
  }
}
