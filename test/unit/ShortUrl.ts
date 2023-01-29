import 'reflect-metadata'
import {describe, it} from 'mocha'
import { expect } from 'chai'
import { ShortUrl } from '../../src/domain/ShortUrl'

describe('ShortUrl', () => {
    it('works with a valid url', () => {
        const url = 'http://www.google.de/'
        const shortUrl = new ShortUrl(url)
        expect(shortUrl.originalUrl.toString()).to.equal(url)
        expect(shortUrl.urlIdentifier).exist
    })

    it('should throw with a malformed url', () => {
        const url = 'http://www.google'
        expect(() => new ShortUrl(url)).to.throw
    })
})