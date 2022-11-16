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
      return user.toJSON();
    }
  }

  type Input = {
    userId: string;
  };

  type Output = {
    id: string;
    birthDate: Date;
    documentNo: string;
    email: string;
    isActive: boolean;
    name: string;
    password: string;
    role: string;
  };
}
