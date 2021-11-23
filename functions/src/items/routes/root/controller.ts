import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export async function redirectToDestination(req: Request, res: Response) {
    const item = await get(req.params.id)
    res.redirect(item.url);
}

async function get(id: String) {
    const db = admin.firestore()
    const response = await db.collection('items')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    const hub = response.docs[0]?.data()
    return hub
}
