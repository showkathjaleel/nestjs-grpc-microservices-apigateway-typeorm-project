import { Observable } from 'rxjs';

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
  profile: Profile;
}

export interface Profile {
  firstname: string;
  lastname: string;
  age: number;
  dob: string;
  userId: number;
}

export interface UserServiceClient {
  getUserById(request: getUserByIdRequest): Observable<getUserByIdResponse>;
  createUser(request: createUserRequest): Observable<createUserRequest>;
  createProfile(
    request: createProfileRequest,
  ): Observable<createProfileRequest>;
}

export interface createUserRequest {
  email: string;
  password: string;
}

export interface createProfileRequest {
  firstname: string;
  lastname: string;
  age: number;
  dob: string;
  userId: number;
}

export interface createProfileResponse {
  user: User;
}
