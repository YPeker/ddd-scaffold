import { UrlIdentifier } from "./UrlIdentifier"

export class ShortUrl {
    private _originalUrl: URL
    private _urlIdentifier: UrlIdentifier
    constructor(url: string) {
        this._originalUrl = new URL(url)
        this._urlIdentifier = UrlIdentifier.generateUrlIdentifer()
    }
    
    get originalUrl(): URL {
        return this._originalUrl
    }

    get urlIdentifier(): UrlIdentifier {
        return this._urlIdentifier
    }


}