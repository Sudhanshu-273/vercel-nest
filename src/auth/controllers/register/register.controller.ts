import {Body, Controller, Post} from '@nestjs/common';
import {RegisterService} from "../../services/register/register.service";
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('auth/register')
@ApiTags('Auth-Register')
export class RegisterController {
    constructor(
        private registerService: RegisterService
    ) {
    }

    @Post()
    async registerUser(@Body() body: CreateUserDto) {
        return this.registerService.createUser({body})
    }
}
