/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Sequelize } from "sequelize-typescript";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sequelize: Sequelize
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("db-connection")
  async checkDbConnection() {
    try {
      const sql = "select * from users";
      await this.sequelize.query(sql);
      return {
        status: "Database is connected"
      };
    } catch (err) {
      console.log(err);
      return {
        status: "Database Connection failed"
      };
    }
  }
}
