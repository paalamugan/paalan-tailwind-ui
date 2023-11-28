import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box/Box';

export interface FlexProps extends BoxProps {
  children: ReactNode;
}

export const Flex = forwardRef<FlexProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('flex', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
