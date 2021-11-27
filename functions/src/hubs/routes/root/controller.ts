import { Request, Response } from 'express'

export async function redirectToDestination(req: Request, res: Response) {
    res.redirect(`https://app-linkhub.web.app/#/main/dashboard/hubs/${req.params.id}`);
}
