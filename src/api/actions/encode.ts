import { Request, Response } from "express";
import { config } from "../../../configs";
import { UrlShortenerService } from "../../application/UrlShortenerService";
import { ShortUrl } from "../../domain/ShortUrl";
import { UrlIdentifierAlreadyExistsError } from "../../infrastructure/UrlIdentifierAlreadyExistsError";
import { tryUntilSucceed } from "../../utils/tryUntilSucceed";
import { ExpressRouteFunc } from "../ExpressRouteFunc";


// shortens the url and responds with the short_url, the short_url_identifier and original_url
// 400 if there was an issue e.g. bad url
export function encode(urlShortenerService: UrlShortenerService): ExpressRouteFunc {
    return async function(req: Request, res: Response) {
        try {
            const url: string = req.body.url

            // this should be done in a nicer and more generic with more time
            // but generally this retries only in case of specific errors (retriable ones) that are thrown
            const shortUrl = await tryUntilSucceed<ShortUrl| undefined>(async () => {
                try {                    
                    return await urlShortenerService.shorten(url)
                } catch (error) {
                    // retry only if there was an issue with an already existing url identifier
                    if(error instanceof UrlIdentifierAlreadyExistsError) {
                        throw error
                    }
                    console.log({ error }, 'Issue during encoding')
                    res.sendStatus(400)
                    return undefined        
                }
            })  
            
            if(shortUrl === undefined) {                
                return
            }
            res.json({
                short_url: `${config.base_url}/decode/${shortUrl.urlIdentifier.urlIdentifier}`,
                short_url_identifier: shortUrl.urlIdentifier.urlIdentifier,
                original_url: shortUrl.originalUrl.toString(),

            })
        } catch (error) {
            console.log({ error }, 'Issue during encoding')
            res.sendStatus(400)
        }
    }
}