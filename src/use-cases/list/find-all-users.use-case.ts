import { UserOutput, UserOutputMapper } from '@/use-cases/dto';
import { UserRepository } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/src/application/use-case';

export namespace FindAllUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { limit, offset } = input;
      const users = await this.userRepository.findAll({ limit, offset });
      return users.map((user) => UserOutputMapper.toOutput(user));
    }
  }

  interface Input {
    limit: number;
    offset: number;
  }
  type Output = UserOutput[];
}
