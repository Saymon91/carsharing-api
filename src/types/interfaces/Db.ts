import Knex from 'knex'

class DB {
  async init(config: object): Promise<Knex.QueryInterface> {
    return new Promise(resolve => {
      const client: Knex.QueryInterface = Knex(config)

    });
  }
}

const db = new DB()
