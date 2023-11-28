module.exports = {
  git: {
    requireBranch: 'main',
    commitMessage: 'chore: release v${version}',
  },
  hooks: {
    'before:init': ['git pull', 'npm run build', 'npm run test'],
    'after:bump': 'npx auto-changelog -p',
  },
  github: {
    release: true,
  },
  npm: {
    publish: true,
  },
};
