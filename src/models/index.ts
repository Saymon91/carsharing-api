'use strict';

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { db as config } from 'config'

const basename: string = path.basename(__filename)
const db: object = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    const extensions: string[] = ['.js', '.ts']
    return (file.indexOf('.') !== 0) && (file !== basename) && extensions.includes((file.slice(-3)));
  })
  .forEach(file => {
    const model: { name: string } = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export = { Sequelize, sequelize, db }

