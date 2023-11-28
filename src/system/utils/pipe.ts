export const pipe = <R>(...fns: Array<(a: R) => R>) => {
  return (v: R) => fns.reduce((a, b) => b(a), v);
};
