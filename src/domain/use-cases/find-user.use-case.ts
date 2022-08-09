import { FindUserByIdInput, FindUserByIdResponse } from '@/domain/dtos';
import { UserNotFoundError } from '@/application/errors';
import { Inject, Injectable } from '@nestjs/common';
import { FindUserById } from '@/domain/contracts/repo';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('UserRepo')
    private readonly userRepo: FindUserById,
  ) {}
  async perform({ userId }: FindUserByIdInput): Promise<FindUserByIdResponse> {
    const result = await this.userRepo.findUserById({
      userId,
    });
    if (!result) throw new UserNotFoundError(userId);
    const { user } = result;
    return { user };
  }
}
