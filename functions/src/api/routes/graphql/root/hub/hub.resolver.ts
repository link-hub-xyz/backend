import * as controller from './hub.controller'

export default {
    Query: {
        hub(_obj: any, args: any) {
            return controller.hub(args.id)
        }
    },
    Hub: {
        id(hub: any) {
            return hub.id
        },
        name(hub: any) {
            return hub.name
        },
        items(hub: any) {
            return hub.items ?? []
        },
        async createItem(hub: any, args: any, context: any) {
            if (hub.creator != context.id) throw "Only creator of this hub can create items."
            const item = await controller.createItem(hub.id, args.url)
            return item.id
        }
    },
    Item: {
        id(id: String) {
            return id
        },
        url(id: String, _args: any, context: any) {
            return `${context.origin}/api/items/${id}`
        },
        async origin(id: String) {
            const item = await controller.item(id)
            return item?.url ?? ""
        }
    }
}