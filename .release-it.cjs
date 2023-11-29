module.exports = {
  git: {
    requireBranch: 'main',
    commitMessage: 'chore: release v${version}',
  },
  hooks: {
    'before:init': ['git pull', 'npm run type-check', 'npm run lint', 'npm run test', 'npm run build:package'],
    'after:bump': 'npx auto-changelog -p',
  },
  github: {
    release: true,
  },
  npm: {
    publish: true,
  },
};
