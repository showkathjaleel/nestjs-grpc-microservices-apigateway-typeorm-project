import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/helpers/entity/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Profile } from 'src/helpers/entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile]),
    ClientsModule.register([
      {
        name: 'ProductService',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50003',
          package: 'product',
          protoPath: join(__dirname, '../../src/helpers/proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
