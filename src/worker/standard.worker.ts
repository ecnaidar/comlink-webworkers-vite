/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

import { longFn } from "./work";

self.onmessage = (e: MessageEvent<string>) => {
  console.log(`worker:standard:${e.data}:init`);
  console.time(`worker:standard:${e.data}`);
  longFn();
  console.timeEnd(`worker:standard:${e.data}`);

  self.postMessage(e.data);
};
