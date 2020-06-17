import { Injectable, OnDestroy } from "@angular/core";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";

@Injectable({
  providedIn: "root",
})
export class JavascriptInterpreterService implements OnDestroy {
  private worker: Worker;
  private isWorkerAvailable = false;

  constructor(private stateManagement: StateManagementService) {
    if (typeof Worker !== "undefined") {
      this.isWorkerAvailable = true;

      this.worker = new Worker("./javascript-interpreter.worker", {
        type: "module",
      });
    }

    this.worker.onmessage = ({ data }) => {
      this.stateManagement.codeResults$.next(data);
    };
  }

  public ngOnDestroy(): void {
    this.worker.terminate();
  }

  public interpret(code: string): void {
    if (this.isWorkerAvailable) {
      this.worker.postMessage(code);
    } else {
      try {
        const responseFn = new Function(`${code} return main()`);
        const data = responseFn();
        this.stateManagement.codeResults$.next({ data });
      } catch (error) {
        this.stateManagement.codeResults$.next({ error });
      }
    }
  }
}
