import Dotenv from 'dotenv-webpack';
import fs from 'fs';
import { isDev } from '../config';
import paths from '../paths';

function PluginGenerator() {
  const path = isDev ? paths.developmentEnv : paths.productionEnv;
  return fs.existsSync(path)
    ? new Dotenv({
        path,
        safe: true,
      })
    : null;
}

export default PluginGenerator;