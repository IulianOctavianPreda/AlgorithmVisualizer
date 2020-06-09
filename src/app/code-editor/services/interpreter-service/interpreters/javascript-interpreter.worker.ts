/// <reference lib="webworker" />

addEventListener("message", ({ data }) => {
  const fn = new Function(`${data} return main()`);
  const response: any = fn();
  postMessage(response);
});
