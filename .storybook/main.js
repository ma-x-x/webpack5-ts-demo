const path = require('path');

const webpackConfig = (config) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src'),
    exclude: /node_modules/,
  });

  config.module.rules.push({
    test: /stories\/(.+).tsx$/,
    exclude: /node_modules/,
    use: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.performance.hints = false;

  config.resolve.alias['@'] = path.resolve(__dirname, '../src');

  return config;
};

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
    },
  },
  webpackFinal: async (config) => {
    return webpackConfig(config);
  },
};
