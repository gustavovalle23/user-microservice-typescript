import {
  CreateUser,
  FindUserById,
  FindAllUsers,
} from '@/domain/contracts/repo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel } from '@/infra/models';
import { User } from '@/domain/entities';
import { UniqueEntityId } from '@/@seedwork/domain/value-objects';

Injectable();
export class UserRepository implements CreateUser, FindUserById, FindAllUsers {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(user: CreateUser.Input): Promise<CreateUser.Output> {
    const userCreated = await this.userModel.create(user);
    return toEntity(userCreated);
  }

  async findUserById({
    userId,
  }: FindUserById.Input): Promise<FindUserById.Output> {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .exec();
    return user ? toEntity(user) : null;
  }

  async findAllUsers(): Promise<FindAllUsers.Output> {
    const users = await this.userModel.find().exec();
    return users.map(toEntity);
  }
}

function toEntity(user: UserModel) {
  const userId = new UniqueEntityId(user._id.toString());
  return new User(
    {
      birthDate: user.birthDate,
      documentNo: user.documentNo,
      email: user.email,
      isActive: user.isActive,
      name: user.name,
      password: user.password,
      role: user.role,
    },
    userId,
  );
}
