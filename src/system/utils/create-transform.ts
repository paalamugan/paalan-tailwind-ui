import type { Transform } from './types';

interface CreateTransformOptions {
  compose?: Transform;
  transform?: Transform;
}

const isImportant = (value: string) => /!(important)?$/.test(value);

const withoutImportant = (value: string | number) =>
  typeof value === 'string' ? value.replace(/!(important)?$/, '').trim() : value;

export const tokenToCSSVar = (value: unknown) => {
  const valueStr = String(value);

  const important = isImportant(valueStr);

  const transformed = withoutImportant(valueStr);

  return important ? `${transformed} !important` : transformed;
};

export function createTransform(options: CreateTransformOptions) {
  const { transform, compose } = options;

  const fn: Transform = (value) => {
    const _value = tokenToCSSVar(value);
    let result = (transform?.(_value) ?? _value) as string | number;
    if (compose) {
      result = compose(result) as string | number;
    }
    return result;
  };

  return fn;
}
