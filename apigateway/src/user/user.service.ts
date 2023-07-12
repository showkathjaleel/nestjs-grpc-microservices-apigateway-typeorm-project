import { Inject, Injectable ,Body} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/helpers/entity/user.entity';
import { Repository } from 'typeorm';
import { UserServiceClient, createUserRequest, getUserByIdRequest, getUserByIdResponse } from 'src/helpers/interface/user.interface';
import { USER_SERVICE_NAME } from 'src/helpers/constants';
import { OnModuleInit } from '@nestjs/common';

import {
  // UserRegisterRequest,
  // UserRegisterResponse,
} from 'src/helpers/interface/user.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit{

    private svc : UserServiceClient;
    
     @Inject('UserService')
     private  client: ClientGrpc;

     public onModuleInit(): void {
        this.svc = this.client.getService<UserServiceClient>('UserService')
     }

       async createUser( body: createUserRequest) {
        try{
            console.log(body,'bodyyyyyy')
          const response=await firstValueFrom(this.svc.createUser(body))
          console.log(response,'responseeeeee')
          return response;
        }catch(err){
           console.log(err.details)
        }
     }

     async getUserById(userId:getUserByIdRequest) {
      try{
        const response=await firstValueFrom(this.svc.getUserById(userId))
        console.log(response,'responsee')
        return response;
      }catch(err){
        console.log(err)
      }

     }
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

  
//    createUser(
//     userRegisterRequest: UserRegisterRequest,
//   ): Promise<UserRegisterRequest> {
//     return this.userRepository.save(userRegisterRequest);
//   }
}
