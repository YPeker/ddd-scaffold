import "reflect-metadata"
import { Server } from './api/server'
import { registerContainer } from './container'

async function init() {
  try {
    const container = registerContainer()
    console.log("Starting Service....")
    const server = container.resolve(Server) 
    server.start()
    console.log("Started Service....")
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}

init()