import webpack, { Configuration } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import DotenvWebpackPluginGenerator from '../plugins/DotenvWebpackPlugin';

const devConfig: Configuration = {
  mode: 'development',
  // devtool: 'eval-source-map',
  devtool: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    DotenvWebpackPluginGenerator(),
  ].filter(Boolean) as Configuration['plugins'],
};
export default merge(commonConfig, devConfig);
