import { Observable } from 'rxjs';
export interface createProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export interface createProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductServiceClient {
  CreateProduct(
    request: createProductRequest,
  ): Observable<createProductResponse>;
  getProductById(
    request: getProductByIdRequest,
  ): Observable<getProductByIdResponse>;
}

export interface getProductByIdRequest {
  id: number;
}

export interface getProductByIdResponse {
  product: Product | undefined;
}

export interface Product {
  id: number;
  price: number;
  name: string;
  quantity: number;
}
