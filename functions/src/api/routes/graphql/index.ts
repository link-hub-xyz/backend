import { Application } from 'express'
import { OptionsData, graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import root from './root'
import authContext from './authContext';

const schema = makeExecutableSchema({
    typeDefs: root.typedefs,
    resolvers: root.resolvers
});

const graphql = graphqlHTTP(async (request, _response, _params) => {
    return {
        schema: schema,
        context: {
            ... await authContext(request)
        },
        graphiql: true
    } as OptionsData
})

export function routesConfig(app: Application) {
    app.use('/api/graphql', graphql)
}