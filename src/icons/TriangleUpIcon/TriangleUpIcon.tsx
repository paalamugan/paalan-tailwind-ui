import * as React from 'react';

import type { IconProps } from '../types';

import { convertSvgIconToIcon } from '@/components/Icon';

const TriangleUp = React.forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => {
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
      <path d="M4 9H11L7.5 4.5L4 9Z" fill={color} />
    </svg>
  );
});

export const TriangleUpIcon = convertSvgIconToIcon(TriangleUp);
