import * as express from 'express';

import * as graphql from './routes/graphql'
import * as test from './routes/test'
import * as misc from './routes/misc'

const app = express()

misc.routesConfig(app)
graphql.routesConfig(app)
test.routesConfig(app)

export default app
