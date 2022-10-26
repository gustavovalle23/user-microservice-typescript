import { User } from '@/application/dtos';
import { UserNotFoundError } from '@/domain/errors';
import { Inject } from '@nestjs/common';
import { FindUserById, USER_REPOSITORY } from '@/domain/contracts/repo';

export namespace FindUserUseCase {
  export class UseCase {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: FindUserById,
    ) {}
    async perform({ userId }: Input): Promise<Output> {
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
