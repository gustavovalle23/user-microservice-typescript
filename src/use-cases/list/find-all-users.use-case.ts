import { Inject } from '@nestjs/common';
import { FindAllUsers, USER_REPOSITORY } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@shared/application/use-case';
import { UserOutput, UserOutputMapper } from '../user.output';

export namespace FindAllUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: FindAllUsers,
    ) {}
    async execute(): Promise<Output> {
      const users = await this.userRepo.findAll();
      return users.map((user) => UserOutputMapper.toOutput(user));
    }
  }

  type Input = void;
  type Output = UserOutput[];
}
