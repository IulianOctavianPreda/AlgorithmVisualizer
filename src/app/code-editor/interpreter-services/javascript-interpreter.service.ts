import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JavascriptInterpreterService implements OnDestroy {
  private worker: Worker;
  private isWorkerAvailable = false;
  private observable: Observable<any>;

  constructor() {
    if (typeof Worker !== "undefined") {
      this.isWorkerAvailable = true;

      this.worker = new Worker("./javascript-interpreter.worker", {
        type: "module",
      });
    }

    this.observable = new Observable((subscriber) => {
      if (this.isWorkerAvailable) {
        this.worker.onmessage = ({ data }) => {
          subscriber.next(data);
        };
        this.worker.onerror = ({ error }) => {
          subscriber.error(error);
        };
      } else {
        // try {
        //   const responseFn = new Function(`${data} main()`);
        //   subscriber.next(responseFn());
        // } catch (error) {
        //   subscriber.error(error);
        // }
      }
    });
  }

  public ngOnDestroy(): void {}

  public interpret(code: string): Observable<any> {
    this.worker.postMessage(code);
    return this.observable;
  }
}
