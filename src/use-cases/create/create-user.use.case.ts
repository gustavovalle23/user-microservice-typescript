import { Inject } from '@nestjs/common';
import { Jwt, JWT_SERVICE } from '@/domain/contracts/gateways';
import DefaultUseCase from '@/@shared/application/use-case';
import { UserOutput } from '@/use-cases/user.output';
import { UserRepository } from '@/domain/contracts/repo';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepo: UserRepository,
      @Inject(JWT_SERVICE)
      private readonly jwt: Jwt,
    ) {}

    async execute(createUserInput: Input): Promise<Output> {
      const { id } = await this.userRepo.create(createUserInput);
      const user = await this.userRepo.findById({
        userId: id,
      });

      const { accessToken } = this.jwt.createAccessToken({ userId: id });

      return {
        user: {
          id: user.id,
          name: user.name,
          birthDate: user.birthDate,
          cpf: user.cpf,
          email: user.email,
          isActive: user.isActive,
        },
        accessToken,
      };
    }
  }

  type Input = {
    email: string;
    name: string;
    isActive: boolean;
    password: string;
    cpf: string;
    birthDate: Date;
  };

  type Output = {
    user: UserOutput;
    accessToken: string;
  };
}
