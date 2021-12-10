import { } from 'firebase-admin'
import controller from './controller'

type AnalyticsInput =
    | UserAnalyticsInput
    | HubAnalyticsInput
    | ItemAnalyticsInput

enum AnalyticsInputType {
    user, hub, item
}

interface UserAnalyticsInput {
    type: AnalyticsInputType.user
    userId: String
}

interface HubAnalyticsInput {
    type: AnalyticsInputType.hub
    hubId: String
}

interface ItemAnalyticsInput {
    type: AnalyticsInputType.item
    itemId: String
}

export default {
    User: {
        analytics(id: String): UserAnalyticsInput {
            return {
                type: AnalyticsInputType.user,
                userId: id
            }
        }
    },

/*

    TODO: Implement per Hub and per Item analytics.

    Hub: {
        analytics(ref: FirebaseFirestore.DocumentReference<Hub>): HubAnalyticsInput {
            return {
                type: AnalyticsInputType.hub,
                hubId: ref.id
            }
        }
    },
    Item: {
        analytics(ref: FirebaseFirestore.DocumentReference<Item>): ItemAnalyticsInput {
            return {
                type: AnalyticsInputType.item,
                itemId: ref.id
            }
        }
    },

*/
    Analytics: {
        daily(input: AnalyticsInput) {
            switch (input.type) {
                case AnalyticsInputType.user:
                    return controller.daily(input.userId);

                case AnalyticsInputType.hub:
                    input.hubId;
                    break;

                case AnalyticsInputType.item:
                    input.itemId;
                    break;
            }
            return []
        },
        retention(input: AnalyticsInput) {
            switch (input.type) {
                case AnalyticsInputType.user:
                    return controller.retention(input.userId);

                case AnalyticsInputType.hub:
                    input.hubId;
                    break;

                case AnalyticsInputType.item:
                    input.itemId;
                    break;
            }
            return []
        },
        total(input: AnalyticsInput) {
            switch (input.type) {
                case AnalyticsInputType.user:
                    return controller.total(input.userId);

                case AnalyticsInputType.hub:
                    input.hubId;
                    break;

                case AnalyticsInputType.item:
                    input.itemId;
                    break;
            }
            return []
        },
    },
}