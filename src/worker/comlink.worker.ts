// longProcesses/count.ts
import { expose } from "comlink";
import { longFn } from "./work";

const MyWorker = {
  executeWork: (message: string) => {
    console.log(message);
    console.time("worker:comlink");
    longFn();
    console.timeEnd("worker:comlink");
  },
};

export type MyWorkerAPI = typeof MyWorker;
expose(MyWorker);
