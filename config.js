const npmRegistryToken = process.env.RENOVATE_NPM_REGISTRY_TOKEN;

/** @type {import('renovate/dist/config/types').AllConfig} */
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
  // onboarding前のリポでも scoped package を正しく解決できるよう
  // 「@tasukukuchinomachi/* は GitHub Packages」を global に効かせる
  packageRules: [
    {
      matchPackageNames: ['/^@tasukukuchinomachi//'],
      registryUrls: ['https://npm.pkg.github.com'],
    },
  ],
  hostRules: npmRegistryToken
    ? [
        {
          hostType: 'npm',
          matchHost: 'npm.pkg.github.com',
          token: npmRegistryToken,
        },
      ]
    : [],
};
