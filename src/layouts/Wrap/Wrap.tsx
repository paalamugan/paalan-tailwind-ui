import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box/Box';

export interface WrapProps extends BoxProps {
  children: ReactNode;
}

export const Wrap = forwardRef<WrapProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('flex flex-wrap gap-2', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});

interface WrapItemProps extends WrapProps {}

export const WrapItem = forwardRef<WrapItemProps, 'div'>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <Box className={cn('flex flex-none items-start', className)} {...restProps} ref={ref}>
      {children}
    </Box>
  );
});
