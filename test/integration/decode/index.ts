import 'reflect-metadata'
import {describe, it} from 'mocha'
import { expect } from 'chai'
import axios from 'axios'
import { config } from '../../../configs'

describe('Decode', () => {
    const httpClient = axios.create({
        baseURL: config.base_url,
        validateStatus: () => true
    })

    it('should return a short url json with a valid url', async () => {
        const url = 'http://www.google.de/'
        const encodeResponse = await httpClient.post('encode', {
            url,
        })
        const encodedData = encodeResponse.data

        const decodeResponse = await httpClient.get(`decode/${encodedData.short_url_identifier}`)
        const data = decodeResponse.data
        expect(data.short_url).to.equal(encodedData.short_url)
        expect(data.short_url_identifier).to.equal(encodedData.short_url_identifier)
        expect(data.short_url).to.contain(data.short_url_identifier)
        expect(data.short_url_identifier).to.equal(encodedData.short_url_identifier)
        expect(data.original_url).to.be.equal(url)          
    })

    it('should return a 400 status with a malformed identifier', async () => {
        const response = await httpClient.get('decode/123456')
        expect(response.status).to.be.equal(400)    
    })

    it('should return a 404 status with a malformed identifier', async () => {
        const response = await httpClient.get('decode/1234567')
        expect(response.status).to.be.equal(404)    
    })

})