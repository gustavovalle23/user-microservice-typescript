import { User } from '@/domain/entities';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  documentNo: string;
  birthDate: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return entity.toJSON();
  }
}
