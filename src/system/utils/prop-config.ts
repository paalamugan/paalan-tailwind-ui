import type * as CSS from 'csstype';
import type { Transform } from '.';

import { createTransform } from './create-transform';

type CSSProp = keyof CSS.Properties | (string & NonNullable<unknown>);
type MaybeArray<T> = T | T[];
type StringUnion<T> = T | (string & NonNullable<unknown>);

export interface PropConfig {
  /**
   * This is useful for props that need to leverage CSS variables
   * Static styles to append to the computed styles.
   *
   * It does not get replicated if value is responsive or styles are nested.
   */
  static?: Record<string, unknown>;
  /**
   * tailwind Css prefix or Css variable the prop maps to
   */
  prefix?: MaybeArray<StringUnion<CSSProp>>;
  /**
   * Function to transform the value passed
   */
  transform?: Transform;
}

export type Config = Record<string, PropConfig | true>;
export function toConfig(transform?: Transform) {
  return <T extends CSSProp>(prefix: T | T[]) => {
    const result: PropConfig = { prefix };
    result.transform = createTransform({
      transform,
    });
    return result;
  };
}
export function toTailwindConfig(transform?: Transform) {
  return <T extends CSSProp, TStyles extends Record<string, string>>(prefix: T | T[], styles?: TStyles) => {
    const result: PropConfig = { prefix };
    result.transform = (value) => {
      return transform?.(value, styles);
    };
    return result;
  };
}

interface Opts {
  property: { ltr: MaybeArray<CSSProp>; rtl: MaybeArray<CSSProp> };
  transform?: Transform;
}

const getRtl = ({ rtl, ltr }: Opts['property']) => {
  const direction = getComputedStyle(document.documentElement).direction;
  return direction === 'rtl' ? rtl : ltr;
};

export function logical(options: Opts): PropConfig {
  const { property, transform } = options;
  return {
    prefix: getRtl(property),
    transform: transform,
  };
}
