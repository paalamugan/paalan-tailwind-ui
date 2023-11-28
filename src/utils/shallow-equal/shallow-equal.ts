export const shallowEqual = (a: unknown, b: unknown) => {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  const keys = Object.keys(a);
  const { length } = keys;

  if (length !== Object.keys(b).length) {
    return false;
  }

  for (let i = 0; i < length; i += 1) {
    const key = keys[i];

    if (!(key in b)) {
      return false;
    }

    if ((a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]) {
      return false;
    }
  }

  return true;
};
