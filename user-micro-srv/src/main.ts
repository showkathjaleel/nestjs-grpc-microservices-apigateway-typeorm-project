import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50004',
        protoPath: join(__dirname, '../src/helpers/proto/user.proto'),
        package: 'user',
      },
    },
  );
  console.log(__dirname);
  await app.listen();
}
bootstrap();
