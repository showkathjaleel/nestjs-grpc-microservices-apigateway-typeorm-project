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
}
