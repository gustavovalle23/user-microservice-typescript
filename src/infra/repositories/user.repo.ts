import {
  CreateUser,
  FindUserById,
  FindAllUsers,
} from '@/domain/contracts/repo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/infra/entities';

type CreateUserInput = CreateUser.Input;
type CreateUserOutput = CreateUser.Output;
type FindUserByIdInput = FindUserById.Input;
type FindUserByIdOutput = FindUserById.Output;
type FindAllUsersOutput = FindAllUsers.Output;

Injectable();
export class UserRepo implements CreateUser, FindUserById, FindAllUsers {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(user: CreateUserInput): Promise<CreateUserOutput> {
    const { id } = await this.userModel.create(user);
    return { id };
  }

  async findUserById({
    userId,
  }: FindUserByIdInput): Promise<FindUserByIdOutput> {
    return await this.userModel.findOne({
      _id: userId,
    });
  }

  async findAllUsers(): Promise<FindAllUsersOutput> {
    const users = await this.userModel.find().exec();
    return users;
  }
}
