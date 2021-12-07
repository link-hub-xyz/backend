import * as controller from './users.controller'

export default {
    Query: {
        users() { return { } } // A namespace container.
    },
    Users: {
        me(_obj: any, _args: any, context: any, _info: any) {
            if (!context.id) throw 'Unauthorized'
            return context.id
        },
        user(_obj: any, args: any, _context: any, _info: any) {
            return args.id;
        } 
    },
    User: {
        id(id: String) {
            return id
        },
        async name(id: String, _args: any, context: any) {
            if (id == context.id) 
                return context.name ?? "";

            const user = await controller.user(id.toString())
            return user.displayName ?? ''
        },
        hubs(id: String) {
            return controller.hubs(id)
        }
    }
}