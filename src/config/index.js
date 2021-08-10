import { merge } from 'lodash';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();


const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4002;

const baseConfig = {
    env,
    isDev: env === 'development',
    port,
}

let envConfig = {}

switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config
        break
    case 'prod':
    case 'production':
        envConfig = require('./prod').config
        break
    default:
        envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)