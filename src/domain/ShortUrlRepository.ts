import { ShortUrl } from "./ShortUrl";
import { UrlIdentifier } from "./UrlIdentifier";

export abstract class ShortUrlRepository {
    abstract findByUrlIdentifier(urlIdentifier: UrlIdentifier): Promise<ShortUrl | undefined>
    abstract save(shortUrl: ShortUrl): Promise<void>
    abstract delete(urlIdentifier: UrlIdentifier): Promise<void>
}