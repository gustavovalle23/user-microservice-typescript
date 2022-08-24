import { User } from '@/domain/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { FindAllUsers } from '@/domain/contracts/repo';

type Output = {
  users?: User[];
};

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('UserRepo')
    private readonly userRepo: FindAllUsers,
  ) {}
  async perform(): Promise<Output> {
    const users = await this.userRepo.findAllUsers();
    return {
      users,
    };
  }
}
