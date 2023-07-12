import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { User } from './helpers/entity/user.entity';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
