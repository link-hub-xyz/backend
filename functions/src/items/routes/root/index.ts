import { Application } from 'express'
import * as requestIp from 'request-ip'
import context from '../../../auth/context'

import { redirectToDestination } from './controller'

export function routesConfig(app: Application) {
    app.use(context)
    app.use(requestIp.mw())
    app.get('/api/items/:id', redirectToDestination);
}