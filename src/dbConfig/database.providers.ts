import { Sequelize } from "sequelize-typescript";

export const databaseConfig: object = {
      production: {
            username: 'freedb_sudhanshu',
            password: 'DVx6VegV#!2Mrxa',
            database: 'freedb_social',
            host: 'sql.freedb.tech',
            port: process.env.DB_PORT || 3306,
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            define: {
                  schema: 'freedb_social'
            }
      },
      development: {
            username: 'root',
            password: 'Chaubey@123',
            database: 'social',
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            define: {
                  schema: 'social'
            }
      }
}

export const sequelize = new Sequelize(databaseConfig["production"])