import { UserNotFoundError } from '@/domain/errors';
import { Inject } from '@nestjs/common';
import DefaultUseCase from '@/@shared/application/use-case';
import { Cpf } from '@/domain/object-values';
import { UserRepository } from '@/domain/contracts/repo';

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
