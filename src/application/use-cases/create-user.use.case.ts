import { User } from '@/application/dtos';
import { Inject } from '@nestjs/common';
import {
  CreateUser,
  FindUserById,
  USER_REPOSITORY,
} from '@/domain/contracts/repo';

export namespace CreateUserUseCase {
  export class UseCase {
    constructor(
      @Inject(USER_REPOSITORY)
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
}
