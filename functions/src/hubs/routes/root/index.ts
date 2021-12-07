import { Application } from 'express'
import * as requestIp from 'request-ip'

import { redirectToDestination } from './controller'

export function routesConfig(app: Application) {
    app.use(requestIp.mw())
    app.get('/api/hubs/:id', redirectToDestination);
}