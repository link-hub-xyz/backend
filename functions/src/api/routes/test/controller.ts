import { Request, Response } from 'express'

export async function test(_req: Request, res: Response) {
    try {
        const { id, role } = res.locals
        if (!id || !role) throw 'Missing id or role. Test failed.';
        return res.status(200).send({ id, role })
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}