import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box/Box';

export interface GridProps extends BoxProps {
  children: ReactNode;
}

export const Grid = forwardRef<GridProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('grid', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});

export interface GridItemProps extends BoxProps {
  children?: ReactNode;
}

export const GridItem = forwardRef<GridItemProps, 'div'>((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <Box {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
