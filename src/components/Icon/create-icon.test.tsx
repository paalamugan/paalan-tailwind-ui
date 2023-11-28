import { render } from '@/test-utils';

import { createIcon } from './create-icon';

const paalanUIIconPath = [
  <title key="1">Paalan Logo</title>,
  <rect width="257" height="257" fill="url(#paint0_linear)" rx="128.5" key="2" />,
  <path
    fill="#fff"
    d="M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z"
    key="3"
  />,
  <defs key="4">
    <linearGradient id="paint0_linear" x1="128.5" x2="128.5" y2="257" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#d47b7b" />
      <stop offset="1" stopColor="#c64b29" />
    </linearGradient>
  </defs>,
];

it('sets default viewBox', () => {
  const Icon = createIcon({
    path: paalanUIIconPath,
  });

  const { container } = render(<Icon />);

  expect(container.querySelector('svg')).toHaveAttribute('viewBox');
});

it('forwards d attribute onto a path element', () => {
  const d =
    'M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z';

  const Icon = createIcon({
    d,
  });

  const { container } = render(<Icon />);

  expect(container.querySelector('path')).toHaveAttribute('d', d);
});

it('accepts a single path', () => {
  const d =
    'M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z';
  const fill = '#fff';

  const Icon = createIcon({
    path: <path fill={fill} d={d} />,
  });

  const { container } = render(<Icon />);

  expect(container.querySelector('svg')!.children).toHaveLength(1);
  expect(container.querySelector('path')).toHaveAttribute('d', d);
  expect(container.querySelector('path')).toHaveAttribute('fill', fill);
});

it('accepts multiple paths', () => {
  const Icon = createIcon({
    path: paalanUIIconPath,
  });

  const { container } = render(<Icon />);

  expect(container.querySelector('svg')!.children).toHaveLength(paalanUIIconPath.length);
});

it('forwards displayName', () => {
  const displayName = 'dummy-display-name';

  const Icon = createIcon({
    path: paalanUIIconPath,
    displayName,
  });

  expect(Icon.displayName).toBe(displayName);
});
