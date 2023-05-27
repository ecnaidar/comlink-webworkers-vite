export const forEachAvailableCore = (fn: (coreIdx: number) => void) => {
  for (let i = 0; i < window.navigator.hardwareConcurrency - 1; i++) {
    fn(i);
  }
};
