import type { Dict } from '@/types/common';
import type { Breakpoints } from '@/utils/generated-theme';

import { breakpoints } from '@/utils/generated-theme';
import { isDefinedValue } from '@/utils/helper';

import { systemProps } from '..';

/**
 * Generates a Tailwind CSS class name based on the given styled props.
 *
 * @param styledProps - The styled props to generate the class name from.
 * @returns The generated Tailwind CSS class name.
 */
export const generateTailwindClassName = (styledProps: Dict) => {
  const classNames: string[] = [];
  Object.entries(styledProps).forEach(([key, value]) => {
    const val = value as string;
    const props = systemProps[key];
    if (!isDefinedValue(props)) return;
    if (typeof props === 'boolean') {
      classNames.push(val);
      return;
    }
    const prefix = props?.prefix || '';
    const prefixes = Array.isArray(prefix) ? prefix : [prefix];

    prefixes.map((prefixVal) => {
      let className = val;
      if (prefixVal) {
        className = `${prefixVal}-${val}`;
      } else if (breakpoints.includes(val as Breakpoints)) {
        className = val;
      }

      const tailwindClassName = (props.transform?.(className) || '') as string;
      if (tailwindClassName && typeof tailwindClassName === 'string') {
        classNames.push(tailwindClassName);
      }
    });
  });

  return classNames.join(' ').trim();
};
