import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import logger from './logger'
import * as test from './routes/test'

const app = express()

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(logger)

test.routesConfig(app)

export default app;
