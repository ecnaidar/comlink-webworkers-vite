// longProcesses/count.ts

import { longFn } from "./work";

self.onmessage = (e: MessageEvent<string>) => {
  console.time("worker");
  longFn();
  console.timeEnd("worker");
};
