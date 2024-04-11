"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.databaseConfig = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
exports.databaseConfig = {
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
};
exports.sequelize = new sequelize_typescript_1.Sequelize(exports.databaseConfig["development"]);
