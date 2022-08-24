import { User } from '@/domain/dtos';
import { UserNotFoundError } from '@/application/errors';
import { Inject, Injectable } from '@nestjs/common';
import { FindUserById } from '@/domain/contracts/repo';

type Input = {
  userId: string;
};

type Output = {
  user: User;
};

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('UserRepo')
    private readonly userRepo: FindUserById,
  ) {}
  async perform({ userId }: Input): Promise<Output> {
    const user = await this.userRepo.findUserById({
      userId,
    });
    if (!user) throw new UserNotFoundError(userId);
    return {
      user,
    };
  }
}
