import { User } from '@/domain/dtos';
import { Inject } from '@nestjs/common';
import { CreateUser, FindUserById } from '@/domain/contracts/repo';

type Input = {
  email: string;
  name: string;
  isActive: boolean;
  password: string;
  documentNo: string;
  birthDate: Date;
};

type Output = {
  user: User;
};

export class CreateUserUseCase {
  constructor(
    @Inject('UserRepo')
    private readonly userRepo: CreateUser & FindUserById,
  ) {}

  async perform(createUserInput: Input): Promise<Output> {
    const { id } = await this.userRepo.createUser(createUserInput);
    const user = await this.userRepo.findUserById({
      userId: id,
    });

    return {
      user,
    };
  }
}
