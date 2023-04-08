import { Entity } from '@/@seedwork/src/domain/entity';
import { EntityValidationError } from '@/@seedwork/src/domain/errors/validation-error';
import { UniqueEntityId } from '@/@seedwork/src/domain/value-objects';
import { UserValidatorFactory } from '../validators';

export type UserProperties = {
  name: string;
  email: string;
  role?: string;
  isActive?: boolean;
  cpf: string;
  password?: string;
  birthDate: Date;
};

export class User extends Entity<UserProperties> {
  constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
    super(props, id);
    this.props.isActive =
      this.props.isActive === undefined ? true : this.props.isActive;
    User.validate(props);
  }

  static validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
