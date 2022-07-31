import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/infra/entities';
import { AllUsersResponse, CreateUserInput, CreateUserResponse } from '@/dtos';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<AllUsersResponse> {
    const users = await this.usersRepository.find();
    return {
      users,
    };
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user: CreateUserInput): Promise<CreateUserResponse> {
    const savedUser = this.usersRepository.create(user);
    return {
      user: savedUser,
    };
  }
}
