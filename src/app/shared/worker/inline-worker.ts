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

/* usage example
https://blog.logrocket.com/how-to-execute-a-function-with-a-web-worker-on-a-different-thread-in-angular/
import { Component, OnInit } from '@angular/core';
import { InlineWorker } from './inlineworker.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  result = 0;

  ngOnInit() {

    const worker = new InlineWorker(() => {
      // START OF WORKER THREAD CODE
      console.log('Start worker thread, wait for postMessage: ');

      const calculateCountOfPrimeNumbers = (limit) => {

        const isPrime = num => {
          for (let i = 2; i < num; i++) {
            if (num % i === 0) { return false; }
          }
          return num > 1;
        };

        let countPrimeNumbers = 0;

        while (limit >= 0) {
          if (isPrime(limit)) { countPrimeNumbers += 1; }
          limit--;
        }

        // this is from DedicatedWorkerGlobalScope ( because of that we have postMessage and onmessage methods )
        // and it can't see methods of this class
        // @ts-ignore
        this.postMessage({
          primeNumbers: countPrimeNumbers
        });
      };

      // @ts-ignore
      this.onmessage = (evt) => {
        console.log('Calculation started: ' + new Date());
        calculateCountOfPrimeNumbers(evt.data.limit);
      };
      // END OF WORKER THREAD CODE
    });

    worker.postMessage({ limit: 300000 });

    worker.onmessage().subscribe((data) => {
      console.log('Calculation done: ', new Date() + ' ' + data.data);
      this.result = data.data.primeNumbers;
      worker.terminate();
    });

    worker.onerror().subscribe((data) => {
      console.log(data);
    });
  }
}
*/
