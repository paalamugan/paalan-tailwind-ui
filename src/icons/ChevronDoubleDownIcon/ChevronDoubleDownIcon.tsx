import { createIcon } from '@/components/Icon';

export const ChevronDoubleDownIcon = createIcon({
  displayName: 'ChevronDoubleDownIcon',
  path: (
    <>
      <path
        fillRule="evenodd"
        d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
        clipRule="evenodd"
      />
    </>
  ),
  defaultProps: {
    fill: 'currentColor',
  },
});
