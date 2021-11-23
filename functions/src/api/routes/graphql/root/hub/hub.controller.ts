import * as admin from 'firebase-admin'
import { v4 } from 'uuid'

export async function item(id: String) {
    const db = admin.firestore()
    const response = await db.collection('items')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    const hub = response.docs[0]?.data()
    return hub
}

export async function itemExists(id: String) {
    const db = admin.firestore()
    const response = await db.collection('items')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    return response.docs.values.length > 0
}

export async function createItem(hubId: String, url: String) {
    const db = admin.firestore()
    const itemId = v4()

    const raw = {
        url: url,
        hub: hubId,
    };

    const itemDoc = await db
        .collection('items')
        .doc(itemId)
    
    itemDoc.set(raw)
    const item = await itemDoc.get()

    const hubDoc = await db.collection('hubs')
        .where(admin.firestore.FieldPath.documentId(), '==', hubId)
        .get()

    hubDoc.docs[0].ref
        .update({ items: admin.firestore.FieldValue.arrayUnion(item.id) })
    
    return { id: item.id, ...item.data() }
}

export async function hub(id: String) {
    const db = admin.firestore()

    const response = await db.collection('hubs')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()

    const doc = response.docs[0]

    return doc && { id: doc.id, ...doc.data() } 
}