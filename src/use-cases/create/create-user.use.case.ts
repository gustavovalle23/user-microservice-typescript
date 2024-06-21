import { Inject } from '@nestjs/common';
import { Jwt, JWT_SERVICE } from '@/domain/contracts/gateways';
import { UserRepository } from '@/domain/contracts/repo';
import DefaultUseCase from '@/@seedwork/src/application/use-case';
import { UserOutput, UserOutputMapper } from '../dto';

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
        user: UserOutputMapper.toOutput(user),
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
