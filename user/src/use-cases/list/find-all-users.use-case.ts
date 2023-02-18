import DefaultUseCase from '@/@shared/application/use-case';
import { UserOutput } from '../user.output';
import { UserRepository } from '@/domain/contracts/repo';

export namespace FindAllUsersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepo: UserRepository) {}
    async execute(): Promise<Output> {
      return this.userRepo.findAll();
    }
  }

  type Input = void;
  type Output = UserOutput[];
}
