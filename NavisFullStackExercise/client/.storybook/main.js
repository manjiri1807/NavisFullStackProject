const webpackConfig = require('../webpack.config.js');

module.exports = {
  stories: ['../app/**/*.stories.js'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: webpackConfig.module.rules },
      resolve: { ...config.resolve, alias: webpackConfig.resolve.alias },
    };
  },
};
