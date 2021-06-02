import webpack, { Compiler } from 'webpack';
import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
// import morgan from 'morgan';
import { getRandomPort } from '../util';
import { devPort, isOpenBrowser, mock } from '../config';
import proxySetting from './proxy';
import paths from '../paths';
import mockServer from '../../mock';

class Application {
  private compiler!: Compiler;

  private getServerPort(defaultPort: number) {
    // 将文件 serve 到 port 3000。
    return getRandomPort(defaultPort);
  }

  async initWebpackDevServer(
    config: ((port: number) => webpack.Configuration) | webpack.Configuration
  ) {
    const port = await this.getServerPort(devPort);
    if (typeof config === 'function') {
      this.compiler = webpack(config(port));
    } else {
      this.compiler = webpack(config);
    }

    const server = new WebpackDevServer(this.compiler, {
      contentBase: paths.appDist,
      // 日志级别- 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error'
      clientLogLevel: 'warn',
      // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。适用于spa应用
      historyApiFallback: true,
      compress: true, // 为每个静态文件开启 gzip
      hot: true, // 热加载
      inline: true,
      open: isOpenBrowser, // 自动打开浏览器
      // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
      overlay: {
        // 报错信息
        warnings: false,
        errors: false,
      },
      noInfo: false,
      proxy: proxySetting, // 代理接口转发
      quiet: true, // 日志信息
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
      before(app) {
        // logging
        // app.use(morgan('combined'));
        // mock
        if (mock) mockServer(app);
      },
      // setup(app) {  此配置项将被 devServer.before 所替代，并将在 v4.0.0 中删除。
      //   if (mock) mockServer(app);
      // },
      // 配置 https 需要的证书等
      // https: {
      //   cert: fs.readFileSync("path-to-cert-file.pem"),
      //   key: fs.readFileSync("path-to-key-file.pem"),
      //   cacert: fs.readFileSync("path-to-cacert-file.pem")
      // }
    });

    server.listen(port, '0.0.0.0', () => {
      console.log('\n');
      console.log(
        chalk.cyan(`server is running at: http://localhost:${port}/\n`)
      );
    });
  }

  async initWebpackProdServer(
    config: (() => webpack.Configuration) | webpack.Configuration
  ) {
    if (typeof config === 'function') {
      this.compiler = webpack(config());
    } else {
      this.compiler = webpack(config);
    }
    this.compiler.run((err, stats) => {
      if (err || (stats && stats.hasErrors())) {
        if (err) {
          console.error(err);
        }
        if (stats) {
          const info = stats.toJson();
          if (stats.hasWarnings()) {
            console.warn(info.warnings);
          }
          if (stats.hasErrors()) {
            console.error(info.errors);
          }
        }
      } else {
        const prodStatsOpts = {
          preset: 'normal',
          colors: true,
        };
        console.log(stats?.toString(prodStatsOpts));
      }
    });
  }
}

export default Application;
