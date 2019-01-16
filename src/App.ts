import express from 'express'
import * as interfaces from './interfaces'

class App {

  private interfaces: object


  constructor() {

  }

  async initInterfaces(): void {

  }

  async init(): void {
    const app =
    await this.mountRoutes()
  }

  private mountRoutes(app): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App()
