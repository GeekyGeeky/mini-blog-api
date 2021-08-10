import cors from 'cors';
import express from 'express';
// import { json, urlencoded } from 'express';
import { config as dotenvConfig } from 'dotenv';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import { connect } from './utils/db';
import appConfig from './config';

import ErrorResponse from './utils/error_response';
import errorHandler from './middlewares/error_handler';

export const app = express();
dotenvConfig();


// import routes
import apiRoutes from './routes';

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(morgan('dev'))


app.use(cors())

app.use(mongoSanitize());

// add secure headers
app.use(helmet());

app.use(xss());


app.use('/api/v1', apiRoutes);

// error handler middleware
app.use(errorHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new ErrorResponse('Route not found', 404)));

// error handler
app.use(errorHandler);

export const start = async () => {
  try {
    await connect();
    app.listen(appConfig.port, () => {
      console.log(`REST API on http://localhost:${appConfig.port}/api`);
      console.log(appConfig.secrets);
    });
  } catch (e) {
    console.error(e)
  }
}
