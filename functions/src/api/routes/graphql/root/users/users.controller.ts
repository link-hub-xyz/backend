import * as admin from 'firebase-admin'
import { v4 } from 'uuid';

export async function createHub(userId: String, name: String) {
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
    const hub = await doc.get()
    
    return { id: hub.id, ...hub.data() }
}

export async function hubs(userId: String) {
    const db = admin.firestore()

    const response = await db.collection('hubs')
        .where('creator', '==', userId)
        .get()

    const hubs = response.docs.map(doc => { return { id: doc.id, ...doc.data() } })

    return hubs
}

export async function user(id: string) {
    const auth = admin.auth()
    return auth.getUser(id)
}