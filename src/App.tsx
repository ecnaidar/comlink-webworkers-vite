import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import useDebugRender from "tilg";
import * as Comlink from "comlink";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

const worker = new Worker(
  new URL("./worker/normal.worker.ts", import.meta.url),
  {
    type: "module",
  }
);

worker.postMessage(null);

const workerURL = new URL("./worker/comlink.worker.ts", import.meta.url);

const comlink = new Worker(workerURL, {
  type: "module",
});

const comlinkWorker =
  Comlink.wrap<import("./worker/comlink.worker").MyWorkerAPI>(comlink);
// // @ts-ignore
comlinkWorker.executeWork("cool");

export default function App() {
  useDebugRender();

  return <Fragment>"Hello world"</Fragment>;
}
