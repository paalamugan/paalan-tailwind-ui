import type React from 'react';
import type { IconProps } from './icon';

import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

import { Icon } from './icon';

interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export const convertSvgIconToIcon = (
  icon:
    | React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
          title?: string;
          titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
      >
    | React.ForwardRefExoticComponent<SvgIconProps & React.RefAttributes<SVGSVGElement>>,
) => {
  const IconComponent = forwardRef<IconProps, 'svg'>(({ className, ...props }, ref) => {
    return <Icon as={icon} ref={ref} className={cn('h-4 w-4', className)} {...props} />;
  });
  return IconComponent;
};
