import express from 'express'
import bodyParser from "body-parser"
import { encode } from './actions/encode';
import { decode } from './actions/decode';
import { UrlShortenerService } from '../application/UrlShortenerService';
import { MemoryBasedShortUrlRepository } from '../infrastructure/MemoryBasedShortUrlRepository';
import { healthCheck } from './actions/healthcheck';
import {  injectable, inject } from 'tsyringe';

@injectable()
export class Server {
    private _server: express.Express

    public constructor(@inject("UrlShortenerService") private _shortenerService: UrlShortenerService ) {
        this._server = express()
        this._server.use(bodyParser.json());
        // ToDo: Improve this by using a propery dependency injection library
        const shortUrlRepository = new MemoryBasedShortUrlRepository()
        const urlShortenerService = new UrlShortenerService(shortUrlRepository)
        this._server.get('/healthcheck', healthCheck())
        this._server.post('/encode', encode(urlShortenerService))
        this._server.get('/decode/:short_url_identifier', decode(urlShortenerService))
    }
    
    public start(port: number = 10000) {
        this._server.listen(port, () => {
            console.log(`Express App Listening on Port ${port}`);
          });
    }
}

