import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {LoginUserDto} from "../../dtos/LoginUser.dto";
import {Sequelize} from "sequelize-typescript";
import * as bcrypt from 'bcrypt'
import {find} from "rxjs";
import {JwtService} from "@nestjs/jwt";

interface _login_user {
    body: LoginUserDto
    res: any
}

@Injectable()
export class LoginService {

    constructor(
        private readonly sequelize: Sequelize,
        private jwtService: JwtService
    ) {
    }

    async loginUser({body, res}: _login_user) {
        try {
            const {username, password} = body;
            const find_user_sql: string = `select *
                                           from users
                                           where username = :username`;
            const [user, m1] = await this.sequelize.query(find_user_sql, {
                replacements: {
                    username: username
                },
                raw: true,
                nest: true
            })

            if (!user) {
                return {
                    status: false,
                    message: 'Invalid Credentials'
                }
            }

            const passwordMatch = await bcrypt.compare(password, user['password']);

            if (!passwordMatch) {
                return {
                    status: false,
                    message: 'Invalid Credentials'
                }
            }

            const payload = {user_id: user['id']};

            const access_token = await this.jwtService.signAsync(payload);


            const validate_token_sql: string = `insert into tokens (access_token, status)
                                                values (:access_token, true);`

            await this.sequelize.query(validate_token_sql, {
                replacements: {
                    access_token: access_token
                }
            });


            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: false
            })

            console.log('Yaha tak chala');


            // followers kheech lo

            const [followings_id, m3] = await this.sequelize.query(`select *
                                                                    from followers
                                                                    where follower_id = :user_id`, {
                replacements: {
                    user_id: user['id']
                }
            });

            const [followers_id, m4] = await this.sequelize.query(`select *
                                                                   from followers
                                                                   where following_id = :user_id`, {
                replacements: {
                    user_id: user['id']
                }
            });

            const followings = followings_id.map((user) => user['following_id'])
            const followers = followers_id.map((user) => user['follower_id'])

            return {
                status: true,
                message: 'Logged in successfully',
                access_token: access_token,
                data: {
                    user_id: user['id'],
                    username: user['username'],
                    email: user['email'],
                    full_name: user['full_name'],
                    bio: user['bio'],
                    followers: followers,
                    followings: followings
                }
            }
        } catch (err) {
            console.log(err);
            throw new HttpException(err, HttpStatus.FORBIDDEN)
        }
    }
}
