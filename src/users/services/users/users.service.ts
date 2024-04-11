import {HttpException, HttpStatus, Injectable, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";
import {Request} from "express";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";

interface _update_user {
    body: UpdateUserDto;
    user_id: number
}

interface _add_follower {
    user_id: number;
    following_id: number;
}

@Injectable()
export class UsersService {

    constructor(
        private readonly sequelize: Sequelize
    ) {
    }

    async getUsers(user_id: number, id: number) {
        // console.log(req['user']);

        const user_details_sql: string = `select u.id, u.username, u.email, u.full_name, COUNT(p.id) as total_posts
                                          from users u
                                                   inner join posts p on p.user_id = u.id
                                          where u.id = :user_id
                                          group by u.id;`

        const [[user_details], m1] = await this.sequelize.query(user_details_sql, {
            replacements: {
                user_id: id
            }
        })

        const [[isFollowing], m2] = await this.sequelize.query(`select COUNT(*) as isFollow
                                                                from followers
                                                                where follower_id = :user_id
                                                                  and following_id = :id`, {
            replacements: {
                user_id: user_id,
                id: id
            }
        });

        const [[followings], m3] = await this.sequelize.query(`select COUNT(*) as followings
                                                               from followers
                                                               where follower_id = :id`, {
            replacements: {
                id: id
            }
        });

        const [[followers], m4] = await this.sequelize.query(`select COUNT(*) as followers
                                                              from followers
                                                              where following_id = :id`, {
            replacements: {
                id: id
            }
        });

        return {
            status: true,
            data: {
                user: user_details,
                isFollowing: isFollowing,
                followings: followings,
                followers: followers

            }
        }


    }


    async updateUser({body, user_id}: _update_user) {

        const get_user_details_sql: string = `select *
                                              from users
                                              where id = :user_id`;

        const [[user], m1] = await this.sequelize.query(get_user_details_sql, {
            replacements: {
                user_id: user_id
            }
        })


        const payload = {
            username: user['username'],
            email: user['email'],
            bio: user['bio'],
            full_name: user['full_name']
        }

        console.log(payload);

        const {username, email, bio, full_name} = body;

        if (username) {
            payload.username = username
        }

        if (email) {
            payload.email = email
        }

        if (bio) {
            payload.bio = bio;
        }

        if (full_name) {

        }


        const update_user_sql: string = `update users
                                         set username  = :username,
                                             email     = :email,
                                             bio       = :bio,
                                             full_name = :full_name
                                         where id = :user_id`

        await this.sequelize.query(update_user_sql, {
            replacements: {
                username: payload.username,
                email: payload.email,
                bio: payload.bio,
                full_name: full_name,
                user_id: user_id
            }
        })


        return {
            status: true,
            message: 'Profile updated successfully'
        };
    }

    async addFollower({user_id, following_id}: _add_follower) {
        try {
            if (user_id === following_id) {
                throw new HttpException('Cannot follow self.', HttpStatus.BAD_REQUEST);
            }
            const add_follower_sql: string = `insert into followers (follower_id, following_id)
                                              values (:follower_id, :following_id)`

            await this.sequelize.query(add_follower_sql, {
                replacements: {
                    follower_id: user_id,
                    following_id: following_id
                }
            });

            return {
                status: true
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async removeFollower({user_id, following_id}: _add_follower) {
        try {
            console.log('Query nahi chali')
            if (user_id === following_id) {
                throw new HttpException('Cannot unfollow self.', HttpStatus.BAD_REQUEST);
            }
            console.log('Query nahi chali')
            const remove_follower_sql: string = `delete
                                                 from followers
                                                 where follower_id = :user_id
                                                   and following_id = :following_id`

            await this.sequelize.query(remove_follower_sql, {
                replacements: {
                    user_id: user_id,
                    following_id: following_id
                }
            });

            console.log('Query nahi chali')


            return {
                status: true
            }
        } catch (err) {
            console.log(err);
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async allFollowers(user_id: number) {
        const [followings_id, m1] = await this.sequelize.query(`select *
                                                                from followers
                                                                where follower_id = :user_id`, {
            replacements: {
                user_id: user_id
            }
        });

        const [followers_id, m2] = await this.sequelize.query(`select *
                                                               from followers
                                                               where following_id = :user_id`, {
            replacements: {
                user_id: user_id
            }
        });

        const followings = followings_id.map((user) => user['following_id'])
        const followers = followers_id.map((user) => user['follower_id'])

        return {
            status: true,
            data: {
                followers: followers,
                followings: followings
            }
        }
    }


    async chatUsers(user_id: number) {
        const get_users_sql: string = `select u.id as following_id, u.username
                                       from followers f
                                                inner join users u on f.following_id = u.id
                                       where follower_id = :user_id`
        const [followings, m2] = await this.sequelize.query(get_users_sql, {
            replacements: {
                user_id: user_id
            }
        });

        return {
            status: true,
            data: followings
        }
    }

    async fetchChats(user_id: number, chat_user_id: number) {
        const sql: string = `select *
                             from chats
                             where (sender_id = :user_id and receiver_id = :chat_user_id)
                                or (sender_id = :chat_user_id and receiver_id = :user_id)
                             order by date desc LIMIT 10;`

        const [chats, m1] = await this.sequelize.query(sql, {
            replacements: {
                user_id: user_id,
                chat_user_id: chat_user_id
            }
        });

        return {
            status: true,
            chats: chats
        }
    }

    async setChat(body, user_id) {
        const {receiver_id, message} = body;

        const set_chat_sql: string = `insert into chats (message, sender_id, receiver_id)
                                      VALUES (:message, :sender_id, :receiver_id)`

        await this.sequelize.query(set_chat_sql, {
            replacements: {
                message: message,
                sender_id: user_id,
                receiver_id: receiver_id
            }
        })

        const data = await this.fetchChats(user_id, receiver_id);

        return {
            status: true,
            chats: data.chats
        }
    }
}
