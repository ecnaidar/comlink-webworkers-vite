export const longFn = () => {
  for (let i = 0; i < 500000000; i++) {
    Math.sqrt(Math.random() * 100);
  }
};
