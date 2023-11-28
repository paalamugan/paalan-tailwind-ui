import type { JestConfigWithTsJest } from 'ts-jest';

import { pathsToModuleNameMapper } from 'ts-jest';

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  // preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    DEV: false,
                    TEST: true,
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^lodash-es$': 'lodash',
  },
  testPathIgnorePatterns: ['dist'],
  setupFilesAfterEnv: ['./setupTests.ts'],
  testMatch: [`**/__tests__/**/*.+(ts|tsx|js)`, `**/?(*.)+(spec|test).+(ts|tsx|js)`],
};

export default jestConfig;
