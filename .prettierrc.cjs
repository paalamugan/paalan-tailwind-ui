// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: ['^react$', '', '<TYPES>', '<TYPES>^[.]', '', '<THIRD_PARTY_MODULES>', '', '^(@)(/.*)$', '', '^[.]'],
  tailwindFunctions: ['cn'],
};
