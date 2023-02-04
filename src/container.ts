import { UrlShortenerService } from "./application/UrlShortenerService"
import { MemoryBasedShortUrlRepository } from "./infrastructure/MemoryBasedShortUrlRepository" 
import {container } from "tsyringe"

export function registerContainer() {
container.register("UrlShortenerService", {
  useClass: UrlShortenerService 
})

container.register("ShortUrlRepository", { 
    useClass: MemoryBasedShortUrlRepository
  })
  return container
} 