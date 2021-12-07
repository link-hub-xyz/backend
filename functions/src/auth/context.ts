import { Request, Response } from 'express';
import * as admin from 'firebase-admin'

declare global {

    namespace Express {
        interface Request {
            context?: Context | undefined;
        }

        interface Context {
            id: string
            role: string
            email: string | undefined
            name: string
        }
    }
}

export default async function context(req: Request, res: Response, next: any) {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer')) {
        return
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        return
    }
    const token = split[1]


    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);

    req.context = {
        id: decodedToken.uid,
        role: decodedToken.role,
        email: decodedToken.email,
        name: decodedToken.name
    }
}