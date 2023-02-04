import { Request, Response } from "express"
import { ExpressRouteFunc } from "../ExpressRouteFunc"


export function healthCheck(): ExpressRouteFunc {
    return async function(req: Request, res: Response) {
        res.sendStatus(200)
    }
}