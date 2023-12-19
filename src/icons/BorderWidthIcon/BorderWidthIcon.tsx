import * as React from 'react';

import type { IconProps } from '../types';

import { convertSvgIconToIcon } from '@/components/Icon';

const BorderWidth = React.forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => {
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
      <path
        d="M1 3H14V4H1V3ZM1 6H14V8H1V6ZM14 10.25H1V12.75H14V10.25Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
});

export const BorderWidthIcon = convertSvgIconToIcon(BorderWidth);
