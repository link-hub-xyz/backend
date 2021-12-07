import * as controller from './hub.controller'
import Hub from '../../../../../documents/hub'
import Item from '../../../../../documents/item'

export default {
    Query: {
        hub(_obj: any, args: any) {
            return controller.hub(args.id)
        }
    },
    Mutation: {
        createHub(_root: any, args: any, context: any) {
            if (!args.name) throw "Hub must have not empty name."
            return controller.createHub(context.id, args.name)
        },
        createItem(_root: any, args: any, context: any) {
            return controller.createItem(args.id, context.id, args.url)
        }
    },
    Hub: {
        id(hub: FirebaseFirestore.DocumentReference<Hub>) {
            return hub.id
        },
        async creator(hub: FirebaseFirestore.DocumentReference<Hub>) {
            return (await hub.get()).data()?.creator
        },
        async name(hub: FirebaseFirestore.DocumentReference<Hub>) {
            return (await hub.get()).data()?.name
        },
        url(hub: FirebaseFirestore.DocumentReference<Hub>, _args: any, context: any) {
            return `${context.origin}/api/hubs/${hub.id}`
        },
        async items(hub: FirebaseFirestore.DocumentReference<Hub>) {
            const doc = await hub.get()
            const data = await doc.data()
            return data?.items ?? []
        }
    },
    Item: {
        id(ref: FirebaseFirestore.DocumentReference<Item>) {
            return ref.id
        },
        url(ref: FirebaseFirestore.DocumentReference<Item>, _args: any, context: any) {
            return `${context.origin}/api/items/${ref.id}`
        },
        async origin(ref: FirebaseFirestore.DocumentReference<Item>) {
            const doc = await ref.get()
            const data = await doc.data()
            return data?.url
        }
    }
}