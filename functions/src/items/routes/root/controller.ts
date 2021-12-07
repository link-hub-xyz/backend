import { Request, Response } from 'express'
import * as admin from 'firebase-admin'


export async function redirectToDestination(req: Request, res: Response) {
    const item = await get(req.params.id)
    item.ref.update({
        analytics: admin.firestore.FieldValue.arrayUnion({
            ip: "test"
        })
    })
    res.redirect(item.data().url);
}

async function get(id: String): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const db = admin.firestore()
    const response = await db.collection('items')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    return response.docs[0]
}
