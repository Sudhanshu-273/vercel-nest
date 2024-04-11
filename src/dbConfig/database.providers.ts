import {Sequelize} from "sequelize-typescript";

export const databaseConfig: object = {
    production: {
        username: 'freedb_sudhanshu',
        password: 'DVx6VegV#!2Mrxa',
        database: 'freedb_social',
        host: 'sql.freedb.tech',
        port: 3306,
        dialect: 'mysql',
      //   define: {
      //       schema: 'sql6693337'
      //   }
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