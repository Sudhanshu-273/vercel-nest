import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../../../auth/auth.guard";
import {PostsService} from "../../services/posts/posts.service";
import {CreatePostDto} from "../../dtos/CreatePost.dto";
import {Request} from "express";
import {AddCommentDto} from "../../dtos/AddComment.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ) {
    }

    @Post('add')
    async addPosts(@Body() body: CreatePostDto, @Req() req: Request) {
        const {user_id} = req['user']
        return this.postsService.addPost({body, user_id})
    }

    @Get('all')
    async allPosts(@Req() req: Request) {
        const {user_id} = req['user']
        console.log(user_id);
        return this.postsService.allPosts({user_id})
    }


    @Post('/like')
    async addLike(@Body() body: { post_id: number, status: number }, @Req() req: Request) {
        const {post_id, status} = body;
        const {user_id} = req['user'];
        return this.postsService.addLike({user_id, post_id, status});
    }

    @Post('comment')
    addComment(@Body() body: AddCommentDto, @Req() req: Request) {
        const {user_id} = req['user'];
        return this.postsService.addComment({body, user_id});
    }

    @Post('comments')
    allComments(@Body() body: {post_id: number}, @Req() req: Request) {
        const {user_id} = req['user'];
        return this.postsService.allComments(body, user_id);
    }

}
