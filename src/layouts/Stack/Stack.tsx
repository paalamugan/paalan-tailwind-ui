import type { ReactNode } from 'react';
import type { BoxProps } from '../Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box';

export interface StackProps extends BoxProps {
  children: ReactNode;
  /**
   * The direction of the stack. Defaults to `column`.
   * @default column
   */
  direction?: 'row' | 'column';
}

export const Stack = forwardRef<StackProps, 'div'>((props, ref) => {
  const { children, className, direction, ...restProps } = props;

  return (
    <Box className={cn('flex flex-col gap-2', className)} flexDirection={direction} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
