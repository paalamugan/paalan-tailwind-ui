export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      2,
      'always',
      [
        'lower-case',
        'upper-case',
        'camel-case',
        'kebab-case',
        'pascal-case',
        'sentence-case',
        'snake-case',
        'start-case',
      ],
    ],
  },
};
