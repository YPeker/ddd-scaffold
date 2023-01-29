import { ShortUrl } from "../domain/ShortUrl";
import { ShortUrlRepository } from "../domain/ShortUrlRepository";
import { UrlIdentifier } from "../domain/UrlIdentifier";
import { UrlIdentifierAlreadyExistsError } from "./UrlIdentifierAlreadyExistsError";

export class MemoryBasedShortUrlRepository implements ShortUrlRepository {
    // One could optimize this by using a Map or Dictionary for faster search
    // but since this part of the implementation is hypothetical -> going the easy implementation way
    private _shortUrls: ShortUrl[] = []

    async findByUrlIdentifier(urlIdentifier: UrlIdentifier): Promise<ShortUrl | undefined> {
        const shortUrl = this._shortUrls.find(x => x.urlIdentifier.equals(urlIdentifier))
        return shortUrl
    }

    async save(shortUrl: ShortUrl): Promise<void> {
        const exists = this._shortUrls.find(x => x.urlIdentifier.equals(shortUrl.urlIdentifier)) !== undefined
        if(exists) {
            throw new UrlIdentifierAlreadyExistsError()
        }
        this._shortUrls.push(shortUrl)
    }

    async delete(urlIdentifier: UrlIdentifier): Promise<void> {
        this._shortUrls = this._shortUrls.filter(x => x.urlIdentifier.equals(urlIdentifier))
    }

}