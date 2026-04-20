module.exports = {
  platform: 'github',
  endpoint: 'https://api.github.com/',
  autodiscover: true,
  autodiscoverFilter: ['TasukuKuchinomachi/*'],
  onboarding: true,
  onboardingConfig: {
    $schema: 'https://docs.renovatebot.com/renovate-schema.json',
    extends: ['github>TasukuKuchinomachi/nomach-renovate'],
  },
  gitAuthor: 'nomach-renovate[bot] <nomach-renovate[bot]@users.noreply.github.com>',
  cacheDir: '/tmp/renovate/cache',
  baseDir: '/tmp/renovate',
};
