import express from 'express'
import bodyParser from "body-parser"
import { encode } from './actions/encode';
import { decode } from './actions/decode';
import { UrlShortenerService } from '../application/UrlShortenerService';
import { MemoryBasedShortUrlRepository } from '../infrastructure/MemoryBasedShortUrlRepository';
import { healthCheck } from './actions/healthcheck';

const server = express();
server.use(bodyParser.json());

// ToDo: Improve this by using a propery dependency injection library
const shortUrlRepository = new MemoryBasedShortUrlRepository()
const urlShortenerService = new UrlShortenerService(shortUrlRepository)
server.get('/healthcheck', healthCheck())
server.post('/encode', encode(urlShortenerService))
server.get('/decode/:short_url_identifier', decode(urlShortenerService))

export { server } 
