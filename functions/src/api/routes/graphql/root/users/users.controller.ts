import * as admin from 'firebase-admin'

export async function hubs(userId: String) {
    const db = admin.firestore()

    const response = await db.collection('hubs')
        .where('creator', '==', userId)
        .get()

    return response
        .docs
        .map(doc => db.doc(`hubs/${doc.id}`))
}

export async function user(id: string) {
    const auth = admin.auth()
    return auth.getUser(id)
}