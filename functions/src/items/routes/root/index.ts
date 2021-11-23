import { Application } from 'express'

import { redirectToDestination } from './controller'

export function routesConfig(app: Application) {
    app.get('/api/items/:id', redirectToDestination);
}