import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";

import { IInputBase } from "./../types/base/input-base";
import { IOutputBase } from "./../types/base/output-base";

export class AlgorithmInlineWorker {
  private readonly worker: Worker;
  private message = new Subject<IOutputBase>();

  constructor(func: string | (() => void), mainFunctionName = "main") {
    const WORKER_ENABLED = !!Worker;

    if (WORKER_ENABLED) {
      const functionBody = this.constructFunctionBody(func, mainFunctionName);

      this.worker = new Worker(
        URL.createObjectURL(
          new Blob([functionBody], { type: "text/javascript" })
        )
      );

      this.worker.onmessage = (data) => {
        this.message.next(data.data);
      };

      this.worker.onerror = (error) => {
        this.message.next({ error });
      };
    } else {
      throw new Error("WebWorker is not enabled");
    }
  }

  postMessage(data: IInputBase) {
    this.worker.postMessage(data);
  }

  onMessage(): Observable<IOutputBase> {
    return this.message.asObservable();
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  constructFunctionBody(func: string | (() => void), mainFunctionName): string {
    let functionBody = typeof func === "string" ? func : func.toString();
    functionBody = `
      try{
        ${functionBody}
        function runWebWorker(data) {
          this.postMessage(${mainFunctionName}(data));
        }

        this.onmessage = (evt) => {
          runWebWorker(evt.data);
        };
      }catch (error){
        this.error({ error });
      }
      `;
    return functionBody;
  }
}
