import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { v4 } from 'uuid'

export async function redirectToDestination(req: Request, res: Response) {

    const item = await getItem(req.params.id)
    if (!item) {
        res.send(404)
        return
    }
    res.redirect(item.data().url)

    const hub = item.data().hub && await getHub(item.data().hub)
    if (hub?.data().creator != req.context?.id) {

        const db = admin.firestore();
        const analyticsId = v4();
        const analyticsDoc = await db
            .collection('analytics')
            .doc(analyticsId);

        analyticsDoc.set({
            item: item.ref,
            ip: req.clientIp,
            date: admin.firestore.FieldValue.serverTimestamp(),
            ...req.context
        });

        item.ref.update({ 
            analytics: admin.firestore.FieldValue.arrayUnion(analyticsDoc) 
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
