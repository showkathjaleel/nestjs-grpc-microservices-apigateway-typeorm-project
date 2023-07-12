import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UserService',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50004',
          package: 'user',
          protoPath: join(__dirname, '../../src/helpers/proto/user.proto'),
        },
      },
    ]),
    
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
