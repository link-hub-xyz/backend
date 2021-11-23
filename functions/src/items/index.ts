import * as express from 'express';
import * as root from './routes/root'

const app = express()
root.routesConfig(app)

export default app