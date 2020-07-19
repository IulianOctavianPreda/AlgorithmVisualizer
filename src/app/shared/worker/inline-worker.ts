import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";

export class InlineWorker {
  private readonly worker: Worker;
  private message = new Subject<MessageEvent>();
  private error = new Subject<ErrorEvent>();

  constructor(func: string | (() => void)) {
    const WORKER_ENABLED = !!Worker;

    if (WORKER_ENABLED) {
      const functionBody =
        typeof func === "string"
          ? func
          : func
              .toString()
              .replace(/^[^{]*{\s*/, "")
              .replace(/\s*}[^}]*$/, "");

      this.worker = new Worker(
        URL.createObjectURL(
          new Blob([functionBody], { type: "text/javascript" })
        )
      );

      this.worker.onmessage = (data) => {
        this.message.next(data);
      };

      this.worker.onerror = (data) => {
        this.error.next(data);
      };
    } else {
      throw new Error("WebWorker is not enabled");
    }
  }

  postMessage(data: any) {
    this.worker.postMessage(data);
  }

  onMessage(): Observable<MessageEvent> {
    return this.message.asObservable();
  }

  onError(): Observable<ErrorEvent> {
    return this.error.asObservable();
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
