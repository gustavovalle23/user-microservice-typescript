import { FindUserByIdInput, FindUserByIdResponse } from '@/domain/dtos';
import { UserNotFoundError } from '@/application/errors';
import { UserRepository } from '@/infra/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async perform({ userId }: FindUserByIdInput): Promise<FindUserByIdResponse> {
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new UserNotFoundError(userId);
    return { user };
  }
}
