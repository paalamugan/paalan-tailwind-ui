import { createIcon } from '@/components/Icon';

export const ChevronUpDownIcon = createIcon({
  displayName: 'ChevronUpDownIcon',
  path: (
    <path
      fillRule="evenodd"
      d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  ),
  defaultProps: {
    fill: 'currentColor',
  },
});
