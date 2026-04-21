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
  packageRules: [
    {
      matchPackageNames: ['/^@tasukukuchinomachi//'],
      registryUrls: ['https://npm.pkg.github.com'],
    },
  ],
  // CI validator では env var 無しで走るため、token 未設定時は
  // hostRules を空にしてバリデーションを通す。本番 workflow では
  // RENOVATE_NPM_REGISTRY_TOKEN が必ず注入されるので空にはならない。
  hostRules: npmRegistryToken
    ? [
        {
          hostType: 'npm',
          matchHost: 'https://npm.pkg.github.com',
          authType: 'Bearer',
          token: npmRegistryToken,
        },
      ]
    : [],
};
