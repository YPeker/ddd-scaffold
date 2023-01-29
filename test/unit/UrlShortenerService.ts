import 'reflect-metadata'
import {describe, it} from 'mocha'
import  chai, {expect}  from 'chai'
import { UrlShortenerService } from '../../src/application/UrlShortenerService'
import { MemoryBasedShortUrlRepository } from '../../src/infrastructure/MemoryBasedShortUrlRepository'
import chaiAsPromised from 'chai-as-promised'
import { nanoid } from 'nanoid'
chai.use(chaiAsPromised);

describe('UrlShortenerService', () => {
    it('should shorten given a valid url', async () => {
        const repo = new MemoryBasedShortUrlRepository()
        const urlShortenerService = new UrlShortenerService(repo)
        const url = 'http://www.google.de/'
        const shortUrl = await urlShortenerService.shorten(url)
        expect(shortUrl.originalUrl.toString()).to.equal(url)
        expect(shortUrl.urlIdentifier).to.exist
    })


    it('should retrieve the original url when previously shortened', async () => {
        const repo = new MemoryBasedShortUrlRepository()
        const urlShortenerService = new UrlShortenerService(repo)
        const url = 'http://www.google.de/'
        const shortUrl = await urlShortenerService.shorten(url)
        const retrievedShortUrl = await urlShortenerService.getOriginalUrl(shortUrl.urlIdentifier.urlIdentifier)
        expect(retrievedShortUrl).to.not.be.null
        expect(retrievedShortUrl!.originalUrl.toString()).to.equal(url)
        expect(retrievedShortUrl!.urlIdentifier.urlIdentifier).to.equal(shortUrl.urlIdentifier.urlIdentifier)
    })

    it('should return null when previously not shortened', async () => {
        const repo = new MemoryBasedShortUrlRepository()
        const urlShortenerService = new UrlShortenerService(repo)
        const retrievedShortUrl = await urlShortenerService.getOriginalUrl(nanoid(7))
        expect(retrievedShortUrl).to.be.null
    })
})