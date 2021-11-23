import type { IncomingMessage, } from 'http';
import * as admin from 'firebase-admin'

export default async function authContext(req: IncomingMessage) {
    const { authorization } = req.headers
    console.log(`Authorization: ${authorization}`)

    if (!authorization || !authorization.startsWith('Bearer')) {
        return
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        return
    }
    const token = split[1]


    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    return { id: decodedToken.uid, role: decodedToken.role, email: decodedToken.email, name: decodedToken.name }    
}