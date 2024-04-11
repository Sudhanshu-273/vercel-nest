import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {Sequelize} from "sequelize-typescript";
import * as bcrypt from 'bcrypt'

interface _create_user {
    body: CreateUserDto;
}

@Injectable()
export class RegisterService {

    constructor(
        private readonly sequelize: Sequelize
    ) {
    }

    async createUser({body}: _create_user) {
        try {
            const {username, email, password} = body;

            const saltOrRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);

            const insert_user_sql: string = `insert into users (username, password, email)
                                             VALUES (:username, :password, :email)`

            const data = await this.sequelize.query(insert_user_sql, {
                replacements: {
                    username: username,
                    password: hashedPassword,
                    email: email
                }
            });

            return {
                status: true,
                message: 'User created Successfully'
            }
        } catch (err) {
            console.log(err)
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}
