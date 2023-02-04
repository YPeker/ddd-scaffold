import 'reflect-metadata'
import {describe, it} from 'mocha'
import  chai, {expect}  from 'chai'
import { UrlIdentifier } from '../../src/domain/UrlIdentifier'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('UrlIdentifier', () => {
    it('generates a new UrlIdentifier with the length 7', () => {
        const urlIdentifier = UrlIdentifier.generateUrlIdentifer()
        expect(urlIdentifier.urlIdentifier).to.exist
        expect(urlIdentifier.urlIdentifier.length).to.equal(7)
    })

    it('creates the value object given a string with length 7', async () => {
        const identifier = '1234567'
        const urlIdentifier = await UrlIdentifier.createFrom(identifier)
        expect(urlIdentifier.urlIdentifier).to.exist
        expect(urlIdentifier.urlIdentifier).to.equal(identifier)
        expect(urlIdentifier.urlIdentifier.length).to.equal(7)
       
    })

    it('throws given a string with length >7', async () => {
        const identifier = '12345678'
        expect( UrlIdentifier.createFrom(identifier)).to.be.rejected
       
    })

    it('throws given a string with length <7', async () => {
        const identifier = '123456'
        expect( UrlIdentifier.createFrom(identifier)).to.be.rejected    
    })
})