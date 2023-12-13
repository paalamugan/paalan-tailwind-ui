import type { TailwindStyledComponentProps } from '@/types/tailwind-styled-component';

import { tailwindBoxVariants } from '@/constants';
import { generateTailwindClassName } from '@/system/utils/helper';
import { forwardRef } from '@/utils/forward-ref';
import { cn, objectStyledPropFilter } from '@/utils/helper';

export interface BoxProps extends TailwindStyledComponentProps {}

export const Box = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, bg, color, borderColor, fontSize, ...restProps } = props;
  const { styledProps, attrProps } = objectStyledPropFilter(restProps);
  const tailwindClassName = generateTailwindClassName(styledProps);

  return (
    <Component
      {...attrProps}
      className={cn(
        className,
        tailwindBoxVariants({
          bg,
          color,
          borderColor,
          fontSize,
        }),
        tailwindClassName,
      )}
      ref={ref}
    />
  );
});
