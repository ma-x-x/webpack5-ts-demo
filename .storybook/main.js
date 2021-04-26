const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../src/stories/index.stories.tsx'],
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-postcss',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });

    config.module.rules.push({
      test: /stories\/(.+).tsx$/,
      use: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    config.performance.hints = false;

    return config;
  },
};
