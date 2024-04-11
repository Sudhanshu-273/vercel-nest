import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {OnModuleInit} from "@nestjs/common";
import {Server} from "socket.io";
import {Sequelize} from "sequelize-typescript";

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})


export class MyGateway implements OnModuleInit {

    constructor(
        private sequelize: Sequelize
    ) {
    }

    @WebSocketServer() server: Server

    onModuleInit(): any {
        this.server.on('connection', (socket) => {
            console.log(socket.id, ' connected')
        })
    }

    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: any) {
        console.log(body)
        const set_chat_sql: string = `insert into chats (message, sender_id, receiver_id)
                                      VALUES (:message, :sender_id, :receiver_id)`

        await this.sequelize.query(set_chat_sql, {
            replacements: {
                message: body.message,
                sender_id: body.sender_id,
                receiver_id: body.receiver_id,
            }
        });

        const sql: string = `select *
                             from chats
                             where (sender_id = :sender_id and receiver_id = :receiver_id)
                                or (sender_id = :receiver_id and receiver_id = :sender_id)
                             order by date desc LIMIT 1`

        const [chats, m1] = await this.sequelize.query(sql, {
            replacements: {
                sender_id: body.sender_id,
                receiver_id: body.receiver_id
            }
        });


        this.server.emit('onMessage', {
            status: true,
            data: chats
        });
    }
}