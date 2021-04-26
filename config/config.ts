const isDev = process.env.NODE_ENV !== 'production';
const projectName = 'webpack5 Typescript';
const bannerDescription = '/** @preserve Powered by webpack5 Typescript */';
const devPort = 5000;
const isOpenBrowser = true;
const mock = true;

export { isDev, projectName, devPort, isOpenBrowser, bannerDescription, mock };
