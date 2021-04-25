import Application, { prodConfig } from '../config';

const app = new Application();

app.initWebpackProdServer(prodConfig);
