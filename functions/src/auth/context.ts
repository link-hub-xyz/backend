import { Request, Response } from 'express';
import * as admin from 'firebase-admin'

declare global {

    namespace Express {
        interface Request {
            context?: Context | undefined;
        }

        interface Context {
            id: string
            role: string | null
            email: string | null
            name: string | null
        }
    }
}

export default async function context(req: Request, res: Response, next: any) {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer')) {
        return next()
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        return next()
    }
    const token = split[1]


    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);

    req.context = {
        id: decodedToken.uid,
        role: decodedToken.role ?? null,
        email: decodedToken.email ?? null,
        name: decodedToken.name ?? null
    }
    next()
}