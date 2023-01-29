import { ShortUrl } from "../domain/ShortUrl";
import { ShortUrlRepository } from "../domain/ShortUrlRepository";
import { UrlIdentifier } from "../domain/UrlIdentifier";

export class UrlShortenerService {

    constructor(private _repository: ShortUrlRepository) {
    }

    public async shorten(url: string): Promise<ShortUrl> {
        try {            
            const shortUrl = new ShortUrl(url)
            await this._repository.save(shortUrl)
            return shortUrl
        } catch (error) {
            console.log({ error }, 'Issue during shortening')
            throw error
        }
    }

    public async getOriginalUrl(shortUrlIdentifier: string): Promise<ShortUrl | null> {
        try {            
            const urlIdentifer = await UrlIdentifier.createFrom(shortUrlIdentifier)
            const shortUrl = await this._repository.findByUrlIdentifier(urlIdentifer)
            return shortUrl ?? null
        } catch (error) {
            console.log({ error }, 'Issue during retrieval of original url')
            throw error
        }
    }
} 