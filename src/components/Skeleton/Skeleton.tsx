import type { HTMLTailwindStyledComponentProps } from '@/types';
import type { FC } from 'react';

import { Box } from '@/layouts';
import { cn } from '@/utils/helper';

export interface SkeletonItemProps extends Omit<HTMLTailwindStyledComponentProps<'div'>, 'as' | 'children'> {}
export const SkeletonItem: FC<SkeletonItemProps> = ({ className, ...props }) => {
  return <Box className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />;
};
SkeletonItem.displayName = 'SkeletonItem';

export interface SkeletonProps extends Omit<HTMLTailwindStyledComponentProps<'div'>, 'as' | 'children'> {
  /**
   * If true, the skeleton will be a circle.
   */
  circle?: boolean;
  /**
   * The number of skeleton items to render.
   */
  count?: number;
  /**
   * The class name to apply to each skeleton item.
   */
  itemClassName?: string;
  /**
   * If true, the skeleton will be full width.
   */
  isFullWidth?: boolean;
}

/**
 * A skeleton is a component used to represent a loading state.
 */
export const Skeleton: FC<SkeletonProps> = ({ className, circle, count, itemClassName, isFullWidth, ...props }) => {
  const countArray = Array.from({ length: count ?? 1 });

  return (
    <Box className={cn('space-y-2', className)} {...props}>
      {countArray.map((_, index) => (
        <SkeletonItem
          key={index}
          className={cn(
            circle ? 'h-12 w-12 rounded-full' : 'h-4 w-full',
            {
              'w-10/12': !circle && !isFullWidth && countArray.length > 1 && index === countArray.length - 1,
            },
            itemClassName,
          )}
        />
      ))}
    </Box>
  );
};
Skeleton.displayName = 'Skeleton';
