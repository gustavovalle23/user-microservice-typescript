import { User, UserDocument } from '@/infra/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FindUserUseCase {
  constructor(
    @InjectModel(User.name)
    private readonly userMongoModel: Model<UserDocument>,
  ) {}

  async perform(userId: string): Promise<User> {
    return await this.userMongoModel
      .findOne({
        _id: userId,
      })
      .exec();
  }
}
