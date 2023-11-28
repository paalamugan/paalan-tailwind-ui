import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box/Box';

export interface ContainerProps extends BoxProps {
  children: ReactNode;
}

export const Container = forwardRef<ContainerProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('container', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
