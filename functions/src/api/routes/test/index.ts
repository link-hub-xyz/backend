import { Application } from 'express'
import { isAuthenticated, isAuthorized } from '../auth'

import { test } from './controller'

export function routesConfig(app: Application) {
    app.get('/api/test',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'] }),
        test
    );
}