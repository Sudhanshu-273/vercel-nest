import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {LoginService} from "../../services/login/login.service";
import {LoginUserDto} from "../../dtos/LoginUser.dto";
import {Response} from "express";
import {ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth-Login')
export class LoginController {
    constructor(
        private loginService: LoginService
    ) {
    }


    @Post('login')
    async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
        const data = await this.loginService.loginUser({body, res});
        console.log(data);
        return res.send(data);
    }

    @Post('logout')
    async logoutUser() {

    }


}
