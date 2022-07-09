import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  async perform(userId: string): Promise<null> {
    console.log(userId);
    return null;
  }
}
