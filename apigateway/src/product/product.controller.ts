import { Body, Controller ,Post} from '@nestjs/common';
import { createProductRequest, createProductResponse } from 'src/helpers/interface/product.interface';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
    constructor(
        private productService : ProductService
    ){}

    @Post('create')
    async createProduct(@Body() payload: createProductRequest):Promise <any> {
        console.log(payload, 'payload in product controller gate')
        const response=await this.productService.createProduct(payload)
        console.log(response,'reswwwwwwwwww')
        return response;

    }
}
