import { Observable } from 'rxjs';

export interface ProductServiceClient {
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
