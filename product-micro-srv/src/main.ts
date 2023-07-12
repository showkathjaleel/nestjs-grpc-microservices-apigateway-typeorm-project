import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50003',
        package: 'product',
        protoPath: join(__dirname, '../src/helpers/proto/product.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
