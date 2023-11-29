import fse from 'fs-extra';
import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    splitting: false,
    entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'],
    external: ['react', 'react-dom', 'react-router-dom', '@heroicons/react'],
    format: ['esm', 'cjs'],
    target: 'esnext',
    outDir: 'dist',
    minify: false,
    skipNodeModulesBundle: false,
    async onSuccess() {
      console.log('Build succeeded!');
      await fse.copy('src/assets', 'dist/assets');
      console.log('Assets copied!');
    },
    dts: {
      entry: [
        'src/index.ts',
        'src/components/index.ts',
        'src/config/index.ts',
        'src/constants/index.ts',
        'src/layouts/index.ts',
        'src/hooks/index.ts',
        'src/icons/index.ts',
        'src/icons/solid/index.ts',
        'src/icons/outline/index.ts',
        'src/providers/index.ts',
        'src/test-utils/index.ts',
        'src/utils/index.ts',
        'src/types/index.ts',
      ],
    },
    bundle: true,
    treeshake: false,
    sourcemap: false,
    clean: true, // clean up the dist folder before building
    platform: 'browser',
    define: {
      'import.meta.env.TEST': 'false',
      'import.meta.env.DEV': 'false',
    },
    // esbuildOptions(options) {
    //   options.conditions = ['module']; // https://esbuild.github.io/api/#conditions
    // },

    // banner: {
    //   js: "'use client';",
    // },
  };
});
