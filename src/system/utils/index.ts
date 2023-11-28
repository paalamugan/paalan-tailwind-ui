import type { PropConfig } from './prop-config';

import { createTransform } from './create-transform';
import { pipe } from './pipe';
import { logical, toConfig, toTailwindConfig } from './prop-config';
import { transformFunctions as transforms } from './transform-functions';

export { transforms };

export * from './types';

export const t = {
  space: toConfig(pipe(transforms.vh, transforms.px, transforms.tailwind)),
  spaceT: toConfig(pipe(transforms.vh, transforms.fraction, transforms.tailwind)),
  sizes: toConfig(pipe(transforms.vh, transforms.px, transforms.tailwind)),
  sizesT: toConfig(pipe(transforms.vh, transforms.fraction, transforms.tailwind)),
  shadows: toConfig(transforms.px),
  blur: toConfig(transforms.blur),
  prop(prefix: PropConfig['prefix'], transform?: PropConfig['transform']) {
    return {
      prefix,
      transform: createTransform({ transform }),
    };
  },
  logical,
  propT(prefix: PropConfig['prefix'], transform?: PropConfig['transform']) {
    return { prefix, transform };
  },
  tailwind: toTailwindConfig(transforms.tailwind),
  tailwindT: toTailwindConfig((value: string | number) => {
    const finalValue = `${value}`.replace('-DEFAULT', '');
    return finalValue;
  }),
};
