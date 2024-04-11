import {Injectable} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";
import {CreatePostDto} from "../../dtos/CreatePost.dto";
import * as moment from 'moment';
import {AddCommentDto} from "../../dtos/AddComment.dto";

interface _create_post {
    body: CreatePostDto;
    user_id: number;
}

interface _all_posts {
    user_id: number;
}

interface _add_like {
    user_id: number;
    post_id: number;
    status: number
}

interface _add_comment {
    body: AddCommentDto;
    user_id: number;
}

@Injectable()
export class PostsService {


    constructor(
        private readonly sequelize: Sequelize
    ) {
    }


    async addPost({body, user_id}: _create_post) {
        const {title, img} = body;
        console.log(img);

        const date = moment().utc().format('YYYY-MM-DD hh-mm');

        const insert_post_sql: string = `insert into posts (user_id, title, img, date)
                                         VALUES (:user_id, :title, :img, :date)`

        await this.sequelize.query(insert_post_sql, {
            replacements: {
                user_id: user_id,
                title: title,
                img: img,
                date: date
            }
        })

        const [data, m1] = await this.sequelize.query(`SELECT p.id                                                        AS post_id,
                                                              u.id                                                        AS user_id,
                                                              u.username,
                                                              p.title,
                                                              p.img,
                                                              p.date,
                                                              COALESCE(like_counts.like_count, 0)                         AS like_count,
                                                              COALESCE(comment_counts.comment_count, 0)                   AS comment_count,
                                                              CASE WHEN like_counts.like_count_user > 0 THEN 1 ELSE 0 END AS liked_by_user
                                                       FROM posts p
                                                                INNER JOIN
                                                            users u ON u.id = p.user_id
                                                                LEFT JOIN (SELECT post_id,
                                                                                  COUNT(id)               AS like_count,
                                                                                  SUM(user_id = :user_id) AS like_count_user
                                                                           FROM likes
                                                                           GROUP BY post_id) AS like_counts
                                                                          ON p.id = like_counts.post_id
                                                                LEFT JOIN (SELECT post_id,
                                                                                  COUNT(id) AS comment_count
                                                                           FROM comments
                                                                           GROUP BY post_id) AS comment_counts
                                                                          ON p.id = comment_counts.post_id
                                                       ORDER BY p.date DESC;
        `, {
            replacements: {
                user_id: user_id
            }
        });


        return {
            status: true,
            message: 'Post uploaded',
            data: data
        }

    }


    async allPosts({user_id}: _all_posts) {
        const all_posts_sql: string = `SELECT p.id                                                        AS post_id,
                                              u.id                                                        AS user_id,
                                              u.username,
                                              u.full_name,
                                              p.title,
                                              p.img,
                                              p.date,
                                              COALESCE(like_counts.like_count, 0)                         AS like_count,
                                              COALESCE(comment_counts.comment_count, 0)                   AS comment_count,
                                              CASE WHEN like_counts.like_count_user > 0 THEN 1 ELSE 0 END AS liked_by_user
                                       FROM posts p
                                                INNER JOIN
                                            users u ON u.id = p.user_id
                                                LEFT JOIN (SELECT post_id,
                                                                  COUNT(id)               AS like_count,
                                                                  SUM(user_id = :user_id) AS like_count_user
                                                           FROM likes
                                                           GROUP BY post_id) AS like_counts
                                                          ON p.id = like_counts.post_id
                                                LEFT JOIN (SELECT post_id,
                                                                  COUNT(id) AS comment_count
                                                           FROM comments
                                                           GROUP BY post_id) AS comment_counts
                                                          ON p.id = comment_counts.post_id
                                       ORDER BY p.date DESC;
        ; `

        const [data, m1] = await this.sequelize.query(all_posts_sql, {
            replacements: {
                user_id: user_id
            }
        });

        return {
            status: true,
            message: 'Posts fetched',
            data: data
        }
    }


    async addLike({user_id, post_id, status}: _add_like) {
        if (status == 1) {
            const add_like_sql: string = `insert into likes (post_id, user_id)
                                          values (:post_id, :user_id);`

            await this.sequelize.query(add_like_sql, {
                replacements: {
                    post_id: post_id,
                    user_id: user_id
                }
            });
        } else {
            const remove_like_sql: string = `delete
                                             from likes
                                             where user_id = :user_id
                                               and post_id = :post_id;`

            await this.sequelize.query(remove_like_sql, {
                replacements: {
                    user_id: user_id,
                    post_id: post_id
                }
            })
        }

        return {
            status: true,
            message: 'Operation successfull'
        }
    }

    async addComment({body, user_id}: _add_comment) {
        const {post_id, content} = body;
        const insert_comment_sql: string = `insert into comments (post_id, user_id, content, date)
                                            values (:post_id, :user_id, :content, CURRENT_TIMESTAMP);`

        await this.sequelize.query(insert_comment_sql, {
            replacements: {
                post_id: post_id,
                user_id: user_id,
                content: content
            }
        });

        return {
            status: true,
            message: 'Comment Added'
        }
    }

    async allComments(body: { post_id: number }, user_id: number) {
        const {post_id} = body;
        const all_comments_sql: string = `select c.id as comment_id,
                                                 u.id as user_id,
                                                 u.username,
                                                 c.content,
                                                 c.post_id,
                                                 c.date
                                          from comments c
                                                   inner join users u on u.id = c.user_id
                                          where c.post_id = :post_id
                                          order by date desc `

        const [data, m1] = await this.sequelize.query(all_comments_sql, {
            replacements: {
                post_id: post_id
            }
        });

        return {
            status: true,
            data: data
        }
    }
}
