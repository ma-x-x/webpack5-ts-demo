import path from 'path';
import fs from 'fs';
import url from 'url';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath: any, needsSlash: boolean) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.slice(0, Math.max(0, inputPath.length - 1));
  }
  if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  }
  return inputPath;
}

const getPublicUrl = (appPackageJson: any): string =>
  // eslint-disable-next-line import/no-dynamic-require
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson: string) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (
  resolveFn: (filePath: string) => string,
  filePath: string
): string => {
  const extensions = moduleFileExtensions.find((extension): boolean =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extensions) {
    return resolveFn(`${filePath}.${extensions}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
export default {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appMock: resolveApp('mock'),
  appDist: resolveApp('dist'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  developmentEnv: resolveApp('.env.development.local'),
  productionEnv: resolveApp('.env.production.local'),
};
