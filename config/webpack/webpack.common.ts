import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import EslintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';
import { resolve, getCssLoaders } from '../util';
import { isDev, projectName } from '../config';
import paths from '../paths';

const commonConfig: Configuration = {
  target: 'web',
  entry: {
    main: [isDev ? resolve('./dev-helper.ts') : paths.appIndexJs],
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\](react|react-dom)[/\\]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': paths.appSrc,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
  },
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的 config 文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    /**
     * 开发环境下默认的缓存存放目录在 node_modules/.cache/webpack/default-development 中
     * 生产环境下默认的缓存存放目录在 node_modules/.cache/webpack/default-production 中，如果想要修改，可通过配置 name，来实现分类存放。如设置 name: 'production-cache' 时生成的缓存存放位置如下。
     */
    // name: 'production-cache', // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
  },
  module: {
    rules: [
      // ts / js 处理
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        // 指定范围
        exclude: /node_modules/,
        include: paths.appSrc,
      },
      { test: /.(css)$/, use: getCssLoaders(1) },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      // 静态资源构建能力
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        // 相当于 file-loader
        type: 'asset/resource',
        generator: {
          // [ext]前面自带"."
          filename: 'assets/fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        // 相当于 url-loader 的自动根据文件大小的配置能力
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      cache: false,
      title: projectName,
      // 自定识别是否压缩
      minify: 'auto',
    }),
    new StylelintPlugin({
      fix: true,
      context: resolve('..'),
      files: 'src/**/*.(s(c|a)ss|css|less)',
    }),
    new EslintPlugin({
      fix: true,
      context: resolve('..'),
      extensions: ['ts', 'tsx', 'js', 'jsx'],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic,
          filter: (resourcePath) => {
            if (resourcePath.includes('index.html')) {
              return false;
            }
            return true;
          },
          to: paths.appDist,
        },
      ],
    }),
    new WebpackBar({
      name: isDev ? 'Starting project' : 'Building project',
    }),
  ].filter(Boolean) as Configuration['plugins'],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.appDist,
    filename: `js/[name]${isDev ? '' : '.[fullhash:8]'}.js`,
    publicPath: isDev ? '/' : '.',
    clean: true, // 构建之前清理
  },
};

export default commonConfig;
