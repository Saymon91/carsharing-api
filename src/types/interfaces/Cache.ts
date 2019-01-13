import Redis from 'ioredis'
import crypto from 'crypto'

class Cache {
  private client: any
  private hashGen = crypto.createHash('sha256')

  async init(config: object): Promise<Cache> {
    return new Promise(resolve => {
      this.client = new Redis(config)
      this.client
        .once('connect', () => resolve(this))
        .on('error', console.error)
        .on('close', () => setTimeout(() => this.client.connect(), 500))
    });
  }

  private hash(key: string): string {
    return this.hashGen.update(key).digest('hex')
  }

  async get(key: string): Promise<any> {
    const data: string|null = await this.client.get(this.hash(key))
    return data === null ? null : JSON.parse(data)
  }

  async set(key: string, data: any, expiry?: number|null): Promise<string> {
     return await Number.isInteger(expiry)
       ? this.client.set(this.hash(key), JSON.stringify(data), 'EXPIRE', expiry, null)
       : this.client.set(this.hash(key), JSON.stringify(data))
  }

  async clear(): Promise<void> {
    return this.client.flushdb()
  }

}

export default new Cache()
