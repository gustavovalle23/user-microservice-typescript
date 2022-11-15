import { User } from '@/application/dtos';
import { UserNotFoundError } from '@/domain/errors';
import { Inject } from '@nestjs/common';
import { FindUserById, USER_REPOSITORY } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/application/use-case';

export namespace FindUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: FindUserById,
    ) {}
    async execute({ userId }: Input): Promise<Output> {
      const user = await this.userRepo.findUserById({
        userId,
      });
      if (!user) throw new UserNotFoundError(userId);
      return {
        user,
      };
    }
  }

  type Input = {
    userId: string;
  };

  type Output = {
    user: User;
  };
}
