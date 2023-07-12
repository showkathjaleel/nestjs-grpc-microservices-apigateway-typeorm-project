import { Injectable } from '@nestjs/common';
import {
  createProductRequest,
  createProductResponse,
  getProductByIdRequest,
  getProductByIdResponse,
} from 'src/helpers/interface/product.interface';
import { Product } from 'src/helpers/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async createProduct(
    productData: createProductRequest,
  ): Promise<createProductResponse> {
    console.log(productData, 'createProductRequest');
    const response = await this.productRepository.save(productData);
    console.log(response, 'reeeee');
    return response;
  }

  async getProductById({
    id,
  }: getProductByIdRequest): Promise<getProductByIdResponse> {
    console.log('payload in productService', id);
    console.log(typeof id, ' idtype');
    // return new Promise((resolve) => {
    //   const product = {
    //     name: 'phone',
    //     price: 100,
    //     quantity: 3,
    //     id: 1,
    //   };
    //   setTimeout(() => {
    //     resolve(product);
    //   }, 1000);
    // });
    const product = await this.productRepository.findOne({ where: { id } });
    return { product: product };
  }
}
