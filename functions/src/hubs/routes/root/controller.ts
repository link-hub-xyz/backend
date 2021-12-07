import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

export async function redirectToDestination(req: Request, res: Response) {

    

    res.redirect(`https://app-linkhub.web.app/#/hubs/${req.params.id}`)
}

async function get(id: String): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const db = admin.firestore()
    const response = await db.collection('hubs')
        .where(admin.firestore.FieldPath.documentId(), '==', id)
        .get()
    return response.docs[0]
}
