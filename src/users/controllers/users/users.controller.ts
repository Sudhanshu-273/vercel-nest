import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {Request} from "express";
import {AuthGuard} from "../../../auth/auth.guard";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Get('profile/:id')
    async users(@Req() req: Request, @Param('id') id: number) {
        const {user_id} = req['user']
        console.log(user_id);
        return this.usersService.getUsers(user_id, id)
    }

    @Post('update')
    async updateUser(@Body() body: UpdateUserDto, @Req() req: Request) {
        console.log(req, body);
        return this.usersService.updateUser({body: body, user_id: req['user']['user_id']});
    }

    @Post('follow')
    async addFollower(@Req() req: Request, @Body() body: { following_id: number }) {
        const {user_id} = req['user']
        const {following_id} = body
        return this.usersService.addFollower({user_id: user_id, following_id: following_id});
    }

    @Post('unfollow')
    async removeFollower(@Req() req: Request, @Body() body: { following_id: number }) {
        const {user_id} = req['user']
        const {following_id} = body
        console.log('Ye unfollow call nahi hua kya', user_id);
        return this.usersService.removeFollower({user_id: user_id, following_id: following_id});
    }

    @Get('followers')
    async allFollowers(@Req() req: Request) {
        const {user_id} = req['user']
        return this.usersService.allFollowers(user_id);
    }

    @Get('chat/profiles')
    async chatUsers(@Req() req: Request) {
        const {user_id} = req['user']
        return this.usersService.chatUsers(user_id);
    }

    @Get('chats/:chat_user_id')
    fetchChats(@Req() req: Request, @Param('chat_user_id') chat_user_id: number) {
        const {user_id} = req['user'];
        return this.usersService.fetchChats(user_id, chat_user_id);

    }

    @Post('chat/set')
    setChat(@Body() body: {receiver_id: number, message: string, }, @Req() req: Request) {
        const {user_id} = req['user'];
        return this.usersService.setChat(body, user_id);
    }

}
