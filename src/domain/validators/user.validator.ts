import { ClassValidatorFields } from '@/@seedwork/src/domain/validators';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserProperties } from '../entities';

export class UserRules {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  birthDate: Date;

  constructor({
    cpf,
    role,
    name,
    email,
    isActive,
    password,
    birthDate,
  }: UserProperties) {
    Object.assign(this, {
      cpf,
      role,
      name,
      email,
      isActive,
      password,
      birthDate,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

export default UserValidatorFactory;
