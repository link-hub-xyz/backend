import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export async function redirectToDestination(req: Request, res: Response) {

    const item = await getItem(req.params.id)
    if (!item) {
        res.send(404)
        return
    }
    res.redirect(item.data().url)
    
    const hub = item.data().hub && await getHub(item.data().hub)
    if (hub?.data().creator != req.context?.id) {
        item.ref.update({
            analytics: admin.firestore.FieldValue.arrayUnion({
                ip: req.clientIp,
                date: new Date().toISOString(),
                ...req.context
            })
        })
    }
}

async function getItem(id: String): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const db = admin.firestore()
    const response = await db.collection('items')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    return response.docs[0]
}

async function getHub(id: String): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const db = admin.firestore()
    const response = await db.collection('hubs')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    return response.docs[0]
}
