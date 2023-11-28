import type { TextProps } from '@/layouts';
import type { FC } from 'react';

import { Text } from '@/layouts';
import { cn } from '@/utils';

interface ErrorMessageProps extends Omit<TextProps, 'children'> {
  /**
   * The error message to display.
   */
  message?: React.ReactNode;
  /**
   * Additional class names to apply to the error message.
   */
  className?: string;
  /**
   * Optional label for the error message to be displayed.
   * this label will be suffix with "is required"
   */
  label?: string;
}
export const ErrorMessage: FC<ErrorMessageProps> = ({ message, className, label, ...props }) => {
  const errorMessage = message || (label ? `${label} is required` : '');
  if (!errorMessage) return null;
  return (
    <Text className={cn('mt-2 text-sm text-danger', className)} {...props}>
      {errorMessage}
    </Text>
  );
};
