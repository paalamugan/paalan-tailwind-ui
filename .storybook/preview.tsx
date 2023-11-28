import type { Preview, StoryFn } from '@storybook/react';

import '../src/globals.css';

import { GLOBALS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';

import { ThemeProvider } from '../src/providers';
import theme from './storybook-theme';

let defaultTwDarkMode = theme.base === 'dark';

/**
 * Whenever the global theme is updated, reload the page to ensure that the theme is applied correctly.
 */
addons.getChannel().on(GLOBALS_UPDATED, ({ globals }) => {
  if (defaultTwDarkMode !== globals.twDarkMode) {
    setTimeout(() => {
      window.location.reload();
    }, 500);
    defaultTwDarkMode = globals.twDarkMode;
  }
});

export const decorators = [
  (Story: StoryFn) => (
    <ThemeProvider
      defaultTheme={theme.base}
      toasterProps={{
        duration: 500000,
      }}
    >
      <Story />
    </ThemeProvider>
  ),
];

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      // storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
      storySort: {
        method: 'alphabetical',
        order: [
          'system',
          ['Getting Started', 'Colors'],
          'layouts',
          'components',
          'icons',
          'hooks',
          ['State Management', 'UI And Dom', 'Utilities', 'Life Cycle'],
          'providers',
        ],
        locales: 'en-US',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme,
    },
  },
} satisfies Preview;

export default preview;
