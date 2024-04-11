import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {databaseConfig} from "./dbConfig/database.providers";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { GatewayModule } from './gateway/gateway.module';


@Module({
    imports: [UsersModule, SequelizeModule.forRoot({
        ...databaseConfig["development"]
    }), AuthModule, PostsModule, GatewayModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
