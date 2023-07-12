import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  createUserRequest,
  getUserByIdRequest,
  getUserByIdResponse,
} from 'src/helpers/interface/user.interface';
import { UserService } from './user.service';
import {
  createProfileRequest,
  createProfileResponse,
} from 'src/helpers/interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(data: getUserByIdRequest){
    console.log(data, 'payload in user-controller');
    return {
      user: await this.userService.getUserById(data),
    };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(payload: createUserRequest): Promise<createUserRequest> {
    console.log(payload, 'payload in createuserrrrrr');
    return this.userService.createUser(payload);
  }

  @GrpcMethod('UserService', 'CreateProfile')
  async createProfile(
    payload: createProfileRequest,
  ): Promise<createProfileResponse> {
    console.log(payload, 'payload in createprofile-service');
    return {
      user: await this.userService.createProfile(payload),
    };
  }
}
