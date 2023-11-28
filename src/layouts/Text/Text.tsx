import type { ReactNode } from 'react';
import type { BoxProps } from '../Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box';

export interface TextProps extends BoxProps {
  children: ReactNode;
}

export const Text = forwardRef<TextProps, 'p'>((props, ref) => {
  const { children, className, as = 'p', ...restProps } = props;

  return (
    <Box as={as} ref={ref} className={cn('', className)} {...restProps}>
      {children}
    </Box>
  );
});
