import cors from 'cors';
import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import { connect } from './utils/db'
import config from './config'

import errorHandler from './middlewares/error_handler'

export const app = express();

// import routes
import indexRouter from './routes/index';

app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))
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


app.use('/api/v1', indexRouter);

// error handler middleware
app.use(errorHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(errorHandler);

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
