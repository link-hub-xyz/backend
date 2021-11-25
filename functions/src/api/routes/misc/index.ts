import { Application } from 'express'
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import logger from './logger'

export function routesConfig(app: Application) {
    app.use(bodyParser.json());
    app.use(cors({ origin: '*' })); //FOR DEBUG FROM DIFFERENT HOST!
    app.use(logger)
}