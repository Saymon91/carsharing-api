import * as Koa from 'koa'
import Router from 'koa-router'
import { Redis } from 'ioredis'
import bodyParserMiddleware from 'koa-bodyparser'

const bearerTokenMiddleware = require('koa-bearer-token')

export default abstract class Base {
  public static get prefix():string { return '/api/v1'; }

  protected router = new Router()
  protected cache: any = null
  protected models: object = null

  abstract initRoutes(): Base

  public init(app: Koa, cache: Redis, models: object): Base {
    this.cache = cache;
    this.models = models;
    app
      .use(bearerTokenMiddleware)
      .use(bodyParserMiddleware())

    this.initRoutes();

    return this;
  }

  protected errorHandler(error: Error, ctx: object): void {
    ctx.response.status = 500
    ctx.response.body = {
      success: true,
      data: this.cache.hgetall('cars')
    }
  }

  protected handler(method: Function): Function {
    return async function (ctx, next) {

    }
  }


}
