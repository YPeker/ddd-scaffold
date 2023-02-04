import 'reflect-metadata'
import {describe, it} from 'mocha'
import { expect } from 'chai'
import axios from 'axios'
import { config } from '../../../configs'

describe('Encode', () => {
    const httpClient = axios.create({
        baseURL: config.base_url,
        validateStatus: () => true
    })

    it('should return a short url json with a valid url', async () => {
        const url = 'http://www.google.de/'
        const response = await httpClient.post('encode', {
            url
        })
        const data = response.data
        expect(data.short_url).to.exist
        expect(data.short_url_identifier).to.exist
        expect(data.short_url).to.contain(data.short_url_identifier)
        expect(data.original_url).to.be.equal(url)          
    })

    it('should return a 400 status with a malformed url', async () => {
        const url = 'google'
        const response = await httpClient.post('encode', {
            url
        })
        expect(response.status).to.be.equal(400)    
    })

})