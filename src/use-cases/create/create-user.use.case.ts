import { Inject } from '@nestjs/common';
import {
  CreateUser,
  FindUserById,
  USER_REPOSITORY,
} from '@/domain/contracts/repo';
import { Jwt, JWT_SERVICE } from '@/domain/contracts/gateways';
import DefaultUseCase from '@/@shared/application/use-case';
import { UserOutput } from '@/use-cases/user.output';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      @Inject(USER_REPOSITORY)
      private readonly userRepo: CreateUser & FindUserById,
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
          documentNo: user.documentNo,
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
    documentNo: string;
    birthDate: Date;
  };

  type Output = {
    user: UserOutput;
    accessToken: string;
  };
}
