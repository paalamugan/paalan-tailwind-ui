import type { ReactNode } from 'react';
import type { BoxProps } from '../Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box';

export interface HStackProps extends BoxProps {
  children: ReactNode;
}

export const HStack = forwardRef<HStackProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('flex flex-row items-center gap-2', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
