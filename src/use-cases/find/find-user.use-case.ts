import { UserNotFoundError } from '@/domain/errors';
import { UserRepository } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/src/application/use-case';

export namespace FindUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepo: UserRepository) {}
    async execute({ userId }: Input): Promise<Output> {
      const user = await this.userRepo.findById({
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
    cpf: string;
    email: string;
    isActive: boolean;
    name: string;
    password: string;
    role: string;
  };
}
