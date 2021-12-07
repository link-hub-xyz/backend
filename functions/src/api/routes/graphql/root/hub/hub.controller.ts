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

    await itemDoc.set({
        url: url,
        hub: hub,
    });

    await hubSnapshot
        .ref
        .update({ items: admin.firestore.FieldValue.arrayUnion(itemDoc) })

    return db.doc(`items/${itemId}`) as FirebaseFirestore.DocumentReference<Item>
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

    await doc.set(raw)

    return db.doc(`hubs/${hubId}`) as FirebaseFirestore.DocumentReference<Hub>
}

export function hub(id: String): FirebaseFirestore.DocumentReference<Hub> {
    const db = admin.firestore()
    return db.doc(`hubs/${id}`) as FirebaseFirestore.DocumentReference<Hub>
}