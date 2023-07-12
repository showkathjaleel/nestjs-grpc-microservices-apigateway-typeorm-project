import { Body, Controller, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProductRequest,
  createProductResponse,
  getProductByIdRequest,
} from 'src/helpers/interface/product.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { getProductByIdResponse } from 'src/helpers/interface/product.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(
    @Body() payload: createProductRequest,
  ): Promise<createProductResponse> {
    console.log(payload, 'ooooooooooooo');
    const response = await this.productService.createProduct(payload);
    return response;
  }

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductById(
    payload: getProductByIdRequest,
  ): Promise<getProductByIdResponse> {
    console.log(payload, 'payload in product-controller');
    const response = await this.productService.getProductById(payload);
    console.log(response, 'product-response in product-controller');
    return response;
    // return {
    //   product: await this.productService.getProductById(payload),
    // };
  }
}
