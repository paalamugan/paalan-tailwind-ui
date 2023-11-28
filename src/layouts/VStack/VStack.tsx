import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box/Box';

export interface VStackProps extends BoxProps {
  children: ReactNode;
}

export const VStack = forwardRef<VStackProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('flex flex-col items-stretch gap-2', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
