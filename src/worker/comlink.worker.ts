/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

import { expose } from "comlink";
import { longFn } from "./work";

const MyWorker = {
  executeWork: (coreIdx: number) => {
    console.log(`worker:comlink:${coreIdx}:init`);
    console.time(`worker:comlink:${coreIdx}`);
    longFn();
    console.timeEnd(`worker:comlink:${coreIdx}`);
    return coreIdx;
  },
};

export type MyWorkerAPI = typeof MyWorker;
expose(MyWorker);
