import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports:[ClientsModule.register([{
    name:'ProductService',
    transport:Transport.GRPC,
    options:{
      url: 'localhost:50003',
        package: 'product',
        protoPath: join(__dirname, '../../src/helpers/proto/product.proto'),
    }
  }]

  )],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
