import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './helpers/entity/user.entity';
import { Profile } from './helpers/entity/profile.entity';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Show@#29',
      database: 'user',
      entities: [Users, Profile],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
