export default {
  '**/*.{ts,tsx}': () => 'npm run type-check',
  '*.{js,jsx,ts,tsx}': 'eslint . --fix --no-ignore --cache --max-warnings 0',
  '*.{json,md,mdx,yml}': 'prettier --write',
};
