import '@testing-library/jest-dom';

import { isValidElement } from 'react';

import type { RenderOptions } from '@testing-library/react';
import type { JestAxeConfigureOptions } from 'jest-axe';
import type { ReactElement } from 'react';

import { axe, toHaveNoViolations } from 'jest-axe';

import { render } from './render';

expect.extend(toHaveNoViolations);

export const testA11y = async (
  ui: ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {},
) => {
  const { axeOptions, ...rest } = options;
  const container = isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container as HTMLElement, axeOptions);
  expect(results).toHaveNoViolations();
};
