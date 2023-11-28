import type { CracoConfig } from '@craco/types';

const cracoConfig: CracoConfig = {
  webpack: {
    configure: (webpackConfig) => {
      if (!webpackConfig.module) {
        webpackConfig.module = {
          rules: [],
        };
      }
      if (webpackConfig.module.rules) {
        webpackConfig.module.rules.push({
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false, // disable the behavior
          },
        });
      }

      return webpackConfig;
    },
  },
};
export default cracoConfig;
