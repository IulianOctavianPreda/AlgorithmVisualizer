/// <reference lib="webworker" />

addEventListener("message", ({ data }) => {
  let response = null;
  try {
    const fn = new Function(`${data} return main()`);
    response = { value: fn() };
  } catch (error) {
    response = { error };
  }
  postMessage(response);
});
