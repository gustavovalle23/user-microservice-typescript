import { User } from '@/application/dtos';
import { Inject } from '@nestjs/common';
import { FindAllUsers, USER_REPOSITORY } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/application/use-case';

export namespace FindAllUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: FindAllUsers,
    ) {}
    async execute(): Promise<Output> {
      const users = await this.userRepo.findAllUsers();
      return {
        users,
      };
    }
  }

  type Input = void;
  type Output = {
    users: User[];
  };
}
