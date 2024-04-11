import {Module} from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: {
      expiresIn: '10d'
    }
  })],
  controllers: [LoginController, RegisterController],
  providers: [RegisterService, LoginService]
})
export class AuthModule {
}
