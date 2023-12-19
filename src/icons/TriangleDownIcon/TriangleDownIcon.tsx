import * as React from 'react';

import type { IconProps } from '../types';

import { convertSvgIconToIcon } from '@/components/Icon';

const TriangleDown = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path d="M4 6H11L7.5 10.5L4 6Z" fill={color} />
      </svg>
    );
  },
);

export const TriangleDownIcon = convertSvgIconToIcon(TriangleDown);
