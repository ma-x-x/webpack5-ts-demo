import Dotenv from 'dotenv-webpack';
import fs from 'fs';
import { isDev } from '../config';
import paths from '../paths';

function PluginGenerator() {
  const path = isDev ? paths.developmentEnv : paths.productionEnv;
  return fs.existsSync(path)
    ? new Dotenv({
        path,
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
      })
    : null;
}

export default PluginGenerator;
