import { Fragment, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import useDebugRender from "tilg";
import { longFn } from "./worker/work";
import { BasicAnimation } from "./animation";

import { wrap, Remote, releaseProxy } from "comlink";
import type { MyWorkerAPI } from "./worker/comlink.worker";
import { forEachAvailableCore } from "./worker/threads";

export const createStandardWorker = () => {
  const worker = new Worker(
    new URL("./worker/standard.worker.ts", import.meta.url),
    {
      type: "module",
    }
  );

  return worker;
};

export const createComlinkWorker = (): Remote<MyWorkerAPI> => {
  if (!window.Worker) throw new Error("No worker support");

  const comlink = new Worker(
    new URL("./worker/comlink.worker.ts", import.meta.url),
    {
      type: "module",
    }
  );

  return wrap<MyWorkerAPI>(comlink);
};

export default function App() {
  useDebugRender();

  return (
    <section>
      <BasicAnimation />
      <div style={{ margin: "auto" }}>
        <button
          type="button"
          onClick={() => {
            console.time("longFn");
            longFn();
            console.timeEnd("longFn");
          }}
        >
          In main
        </button>
        <button
          type="button"
          onClick={() => {
            forEachAvailableCore((coreIdx) => {
              const worker = createStandardWorker();
              worker.postMessage(coreIdx);

              worker.onmessage = (e) => {
                console.log(`main:standard:${e.data}`);
                worker.terminate();
              };
            });
          }}
        >
          Standard
        </button>
        <button
          type="button"
          onClick={() => {
            forEachAvailableCore(async (coreIdx) => {
              const worker = createComlinkWorker();
              await worker.executeWork(coreIdx);

              console.log(`main:comlink:${coreIdx}`);
            });
          }}
        >
          Comlink
        </button>
      </div>
    </section>
  );
}
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
