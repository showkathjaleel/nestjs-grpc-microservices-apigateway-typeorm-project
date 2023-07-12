import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { createProductRequest } from 'src/helpers/interface/product.interface';
import { ProductServiceClient } from 'src/helpers/interface/product.interface';

@Injectable()
export class ProductService implements OnModuleInit{
  private svc:ProductServiceClient

  @Inject('ProductService')
  private client: ClientGrpc;

  public onModuleInit(): void {
      this.svc= this.client.getService<ProductServiceClient>('ProductService')
  }

   async createProduct(payload: createProductRequest){
    console.log(payload,'productData')
    try{
      const response= await firstValueFrom(this.svc.CreateProduct(payload))
      return response
    }catch(err) {
      console.log(err)
    }
   

   }
}
