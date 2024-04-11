import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {Sequelize} from "sequelize-typescript";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private sequelize: Sequelize) {
    }

    async canActivate(context: ExecutionContext) {

        const req = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(req);

        const check_token_sql: string = `select *
                                         from tokens
                                         where access_token = :access_token`;

        const [[token_status], m2] = await this.sequelize.query(check_token_sql, {
            replacements: {
                access_token: token
            },
        })

        console.log('TokenStatus', token_status)

        if (!token_status) {
            throw new UnauthorizedException();
        } else {
            if (!token_status['status']) {
                throw new UnauthorizedException();
            }
        }


        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'secret'
            });

            req['user'] = payload;
        } catch (err) {

            throw new UnauthorizedException();
        }


        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return (type === 'Bearer') ? token : undefined;
    }
}