export const longFn = () => {
  for (let i = 0; i < 1000000000; i++) {
    Math.sqrt(Math.random() * 10000);
  }
};
