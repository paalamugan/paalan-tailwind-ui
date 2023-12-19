import { createIcon } from '@/components/Icon';

export const ChevronDoubleLeftIcon = createIcon({
  displayName: 'ChevronDoubleLeftIcon',
  path: (
    <>
      <path
        fillRule="evenodd"
        d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
        clipRule="evenodd"
      />
    </>
  ),
  defaultProps: {
    fill: 'currentColor',
  },
});
