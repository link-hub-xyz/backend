import * as admin from 'firebase-admin'
import { v4 } from 'uuid'
import Hub from '../../../../../documents/hub'
import Item from '../../../../../documents/item'

export async function createItem(
    hubId: String,
    userId: String,
    url: String
): Promise<FirebaseFirestore.DocumentReference<Item>> {

    const db = admin.firestore()
    const itemId = v4()

    const hub = db.doc(`hubs/${hubId}`)
    const hubSnapshot = await hub.get();

    if (hubSnapshot.data()?.creator != userId) {
        throw "Only hub creator can create items"
    }

    const itemDoc = await db
        .collection('items')
        .doc(itemId);

    itemDoc.set({
        url: url,
        hub: hub,
    });

    hubSnapshot
        .ref
        .update({ items: admin.firestore.FieldValue.arrayUnion(itemDoc) })

    return itemDoc as FirebaseFirestore.DocumentReference<Item>
}

export async function createHub(
    userId: String,
    name: String
): Promise<FirebaseFirestore.DocumentReference<Hub>> {

    const db = admin.firestore()
    const hubId = v4()

    const raw = {
        name: name,
        creator: userId,
        items: []
    };

    const doc = await db
        .collection('hubs')
        .doc(hubId)

    doc.set(raw)

    return await doc as FirebaseFirestore.DocumentReference<Hub>
}

export function hub(id: String): FirebaseFirestore.DocumentReference<Hub> {
    const db = admin.firestore()
    return db.doc(`hubs/${id}`) as FirebaseFirestore.DocumentReference<Hub>
}