/// <reference lib="webworker" />

addEventListener("message", ({ data }) => {
  const fn = new Function(`${data} main()`);
  const response: any = fn();
  postMessage(response);
});
