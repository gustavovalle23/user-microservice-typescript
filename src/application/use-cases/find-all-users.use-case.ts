import { User } from '@/application/dtos';
import { Inject } from '@nestjs/common';
import { FindAllUsers, USER_REPOSITORY } from '@/domain/contracts/repo';

export namespace FindAllUsersUseCase {
  export class UseCase {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: FindAllUsers,
    ) {}
    async perform(): Promise<Output> {
      const users = await this.userRepo.findAllUsers();
      return {
        users,
      };
    }
  }
  type Output = {
    users: User[];
  };
}
