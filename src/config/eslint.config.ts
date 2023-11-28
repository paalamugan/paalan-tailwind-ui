export default {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
      // enable eslint-plugin-testing-library rules or preset only for matching files!
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
      },
    },
  ],
  plugins: ['import', 'sort-keys-fix', '@typescript-eslint', 'prettier', 'react-refresh'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-as-const': 'warn',
    eqeqeq: ['error', 'always'],
    'import/default': 'error',
    'import/export': 'error',
    'import/named': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'error',
    'import/order': [
      'warn',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
      },
    ],
    'no-alert': 'error',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-empty-pattern': 'error',
    'no-extra-boolean-cast': 'error',
    'no-redeclare': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            message: `Please use import { method } from "lodash-es" instead.`,
            name: 'lodash',
          },
          {
            importNames: ['chain'],
            message: 'Avoid using chain since it is non tree-shakable. Try out flow instead.',
            name: 'lodash-es',
          },
          {
            importNames: ['default'],
            message: `Instead of default import, please use import { method } from "lodash-es" instead.`,
            name: 'lodash-es',
          },
          {
            message: 'Avoid using chain since it is non tree-shakable. Try out flow instead.',
            name: 'lodash-es/chain',
          },
          {
            message: "Please use import { method } from '@/test-utils' instead.",
            name: '@testing-library/react',
          },
        ],
        patterns: ['lodash/**', 'lodash/fp/**', 'dayjs'],
      },
    ],
    'no-unused-private-class-members': 'error',
    'prefer-const': 'warn',
    'prettier/prettier': [
      'warn',
      {},
      {
        properties: {
          usePrettierrc: true,
        },
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
    'sort-keys-fix/sort-keys-fix': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: ['destructive'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
    react: {
      version: 'detect',
    },
  },
};
