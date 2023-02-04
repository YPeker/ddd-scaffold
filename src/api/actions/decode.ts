import { Request, Response } from "express"
import { config } from "../../../configs"
import { UrlShortenerService } from "../../application/UrlShortenerService"
import { ExpressRouteFunc } from "../ExpressRouteFunc"


// gets the original url via short url identifier
// 404 if it is not stored
// 400 if the short url identifier is malformed aka not length 7
export function decode(urlShortenerService: UrlShortenerService): ExpressRouteFunc {
    return async function(req: Request, res: Response) {
        try {
            const shortUrlIdentifier: string = req.params.short_url_identifier
            const shortUrl = await urlShortenerService.getOriginalUrl(shortUrlIdentifier)
            if(shortUrl === null) {
                res.sendStatus(404)
                return
            }
            res.json({
                short_url: `${config.base_url}/decode/${shortUrl.urlIdentifier.urlIdentifier}`,
                short_url_identifier: shortUrl.urlIdentifier.urlIdentifier,
                original_url: shortUrl.originalUrl.toString()

            })
        } catch (error) {
            console.log({ error }, 'Issue during decoding')
            res.sendStatus(400)
        }
    }
}