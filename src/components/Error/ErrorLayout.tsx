import type { FC, ReactNode } from 'react';

import { Cross1Icon } from '@/icons';
import { Box, Center, Heading, Text, VStack } from '@/layouts';
import { cn } from '@/utils/helper';

export interface ErrorLayoutProps {
  /**
   * Heading of the error content
   */
  heading: ReactNode;
  /**
   * Subheading of the error content
   */
  subHeading: ReactNode;
  /**
   * Children of the error content
   */
  children: ReactNode;
  /**
   * Icon of the error content
   */
  icon?: React.ReactElement;
  /**
   * Show icon of the error content
   */
  showIcon?: boolean;
  /**
   * Classname of the error content
   */
  className?: string;
  /**
   * Classname of the heading of the error content
   */
  headingClassName?: string;
  /**
   * Classname of the subheading of the error content
   */
  subHeadingClassName?: string;
}

export const ErrorLayout: FC<ErrorLayoutProps> = ({
  children,
  heading,
  icon,
  showIcon,
  subHeading,
  className,
  headingClassName,
  subHeadingClassName,
}) => {
  return (
    <Center className={cn('min-h-[75vh] flex-col gap-6 text-center text-red-500', className)}>
      {showIcon ? (
        <Box className="rounded-full  bg-red-100 p-5">
          <Cross1Icon className="h-8 w-8 text-red-500" />
        </Box>
      ) : (
        icon
      )}
      <VStack className="max-w-2xl">
        <Heading as="h2" className={cn('text-lg md:text-xl', headingClassName)}>
          {heading}
        </Heading>
        <Text className={cn('text-base md:text-lg', subHeadingClassName)}>{subHeading}</Text>
      </VStack>
      {children}
    </Center>
  );
};
