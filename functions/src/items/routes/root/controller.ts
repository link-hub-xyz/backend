import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export async function redirectToDestination(req: Request, res: Response) {
    try {
        const item = await getItem(req.params.id)
        const hub = item.data().hub && await getHub(item.data().hub)
        res.redirect(item.data().url)

        if (hub?.data().creator != req.context?.id) {
            item.ref.update({
                analytics: admin.firestore.FieldValue.arrayUnion({
                    ip: req.clientIp,
                    ...req.context
                })
            })
        }
    } catch (e) {
        res.send(e)
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
