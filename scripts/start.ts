import { merge } from 'webpack-merge';
import Application, {
  devConfig,
  FriendlyErrorsWebpackPluginGenerator,
} from '../config';

const app = new Application();

app.initWebpackDevServer((port:number) =>
  merge(devConfig, {
    plugins: [FriendlyErrorsWebpackPluginGenerator(port)],
  })
);
