import { createIcon } from '@/components/Icon';

export const ChevronRightIcon = createIcon({
  displayName: 'ChevronRightIcon',
  path: (
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
      clipRule="evenodd"
    />
  ),
  defaultProps: {
    fill: 'currentColor',
  },
});
