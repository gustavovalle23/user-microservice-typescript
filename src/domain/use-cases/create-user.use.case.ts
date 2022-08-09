import { CreateUserInput, CreateUserResponse } from '@/domain/dtos';
import { Inject } from '@nestjs/common';
import { CreateUser, FindUserById } from '@/domain/contracts/repo';

export class CreateUserUseCase {
  constructor(
    @Inject('UserRepo')
    private readonly userRepo: CreateUser & FindUserById,
  ) {}

  async perform(createUserInput: CreateUserInput): Promise<CreateUserResponse> {
    const { id } = await this.userRepo.createUser(createUserInput);
    return await this.userRepo.findUserById({
      userId: id,
    });
  }
}
