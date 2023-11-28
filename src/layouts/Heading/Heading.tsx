import type { ReactNode } from 'react';
import type { BoxProps } from '../Box';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Box } from '../Box';

export interface HeadingProps extends BoxProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingSizes = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-semibold',
  h5: 'text-base font-semibold',
  h6: 'text-sm font-semibold',
};

export const Heading = forwardRef<HeadingProps, 'h1'>((props, ref) => {
  const { children, as: headTag = 'h1', className, ...restProps } = props;

  const size = headingSizes[headTag as keyof typeof headingSizes];
  return (
    <Box as={headTag} {...restProps} ref={ref} className={cn(size, className)}>
      {children}
    </Box>
  );
});
