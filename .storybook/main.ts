import path from 'path';

import type { StorybookConfig } from '@storybook/react-vite';

import 'storybook-addon-tw-dm-toggle';

import { mergeConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true,
  },
  addons: [
    'storybook-addon-tw-dm-toggle',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    'storybook-addon-react-router-v6',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 120, singleQuote: false },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // customize the Vite config here
    config.plugins?.push(tsconfigPaths());
    config.plugins?.push(EnvironmentPlugin('all'));

    if (config.build) {
      config.build = {
        ...config.build,
        chunkSizeWarningLimit: 25000,
      };
    }

    // Merge custom configuration into the default config
    return mergeConfig(config, {});
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
};
export default config;
