import * as React from 'react';

import type { IconProps } from '../types';

import { convertSvgIconToIcon } from '@/components/Icon';

const Columns = React.forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => {
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
        d="M2.14998 14V1H0.849976V14H2.14998ZM6.14998 14V1H4.84998V14H6.14998ZM10.15 1V14H8.84998V1H10.15ZM14.15 14V1H12.85V14H14.15Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
});

export const ColumnsIcon = convertSvgIconToIcon(Columns);
