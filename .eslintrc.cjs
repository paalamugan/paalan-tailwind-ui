module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  rules: {
    'prettier/prettier': ['warn', require('./.prettierrc.cjs')],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/prefer-as-const': 'warn',
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    'import/default': 'error',
    'import/export': 'error',
    'import/named': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'error',
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: [
          'danger',
          'tertiary',
          'secondary',
          'primary',
          'success',
          'warning',
          'info',
          'muted',
          'accent',
          'popover',
          'card',
          'toast-*',
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  overrides: [
    {
      files: ['*.mdx', '*.md'],
      extends: 'plugin:mdx/recommended',
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
