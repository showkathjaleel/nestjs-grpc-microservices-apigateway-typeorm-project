import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User, getUserByIdRequest } from 'src/helpers/interface/user.interface';
import { createUserRequest } from 'src/helpers/interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/helpers/entity/user.entity';
import { ProductServiceClient } from 'src/helpers/interface/product.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { createProfileRequest } from 'src/helpers/interface/user.interface';
import { Profile } from 'src/helpers/entity/profile.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService implements OnModuleInit {
  private productSvc: ProductServiceClient;

  @Inject('ProductService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.productSvc =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  @InjectRepository(Users)
  private readonly userRepository: Repository<Users>;

  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>;

  async getUserById(param: getUserByIdRequest): Promise<any> {
    console.log(param, 'payload in user-service');
    try {
      const product = await firstValueFrom(
        this.productSvc.getProductById(param),
      );
      console.log(product, 'product in user-service');
      const userId = param.id;
      console.log(userId, '55555555');
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });
      console.log(user, 'user');
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(
    createUserRequest: createUserRequest,
  ): Promise<createUserRequest> {
    console.log(createUserRequest, 'createUserRequest');
    const response = await this.userRepository.save(createUserRequest);
    console.log(response, 'resp');
    return response;
  }

  async createProfile(payload: createProfileRequest) {
    const id = payload.userId;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      console.log('user not found');
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const newProfile = await this.profileRepository.create(payload);
    const savedProfile = await this.profileRepository.save(newProfile);
    console.log(savedProfile, 'savedprofile in user-service');
    user.profile = savedProfile;
    const updatedUser = await this.userRepository.save(user);
    console.log('updatedUser', updatedUser);
    return updatedUser;
  }
}
