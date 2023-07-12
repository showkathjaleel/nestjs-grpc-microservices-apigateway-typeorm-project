import { Observable } from 'rxjs';

// getUserById
export interface getUserByIdRequest {
  id: number;
}
export interface getUserByIdResponse {
  user: User | undefined;
}
export interface User {
  id: number;
  email: string;
  password: string;
}


export interface UserServiceClient {
  getUserById(request: getUserByIdRequest): Observable<getUserByIdResponse>;
  createUser(request: createUserRequest) : Observable< createUserRequest> ;
}


// export interface UserRegisterRequest {
//   email: string;
//   password: string;
// }
// export interface UserRegisterResponse {
//   id: number;
//   email: string;
// }


// createUser
export interface createUserRequest {
  email: string;
  password : string;
}
