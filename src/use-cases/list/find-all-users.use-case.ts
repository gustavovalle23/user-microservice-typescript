import { UserOutput, UserOutputMapper } from '@/use-cases/dto';
import { UserRepository } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/src/application/use-case';

export namespace FindAllUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(): Promise<Output> {
      const users = await this.userRepository.findAll();
      return users.map((user) => UserOutputMapper.toOutput(user));
    }
  }

  type Input = void;
  type Output = UserOutput[];
}
