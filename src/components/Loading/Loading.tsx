import type React from 'react';

import { LoadingIcon } from '@/icons/LoadingIcon';
import { Flex } from '@/layouts';
import { cn } from '@/utils/helper';

type LoadingProps = React.ComponentPropsWithoutRef<typeof LoadingIcon> & {
  /**
   * Optional spin for the Loading
   * @default true
   */
  spin?: boolean;
  /**
   * Optional className for the Loading parent element
   */
  parentClassName?: string;
  /**
   * Optional content to display next to the Loading
   */
  content?: React.ReactNode;
};

export const Loading: React.FC<LoadingProps> = ({ className, spin = true, content, parentClassName, ...props }) => {
  return (
    <Flex className={cn('inline-flex items-center gap-2 text-gray-800', parentClassName)}>
      <LoadingIcon
        {...props}
        className={cn(
          'text-gray-500 dark:text-gray-50',
          {
            'animate-spin': !!spin,
          },
          className,
        )}
      />
      {content}
    </Flex>
  );
};
