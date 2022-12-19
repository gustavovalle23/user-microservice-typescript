import { Entity } from '@/@shared/domain/entity';
import { UniqueEntityId } from '@/@shared/domain/value-objects';

type UserProps = {
  name: string;
  email: string;
  role?: string;
  isActive?: boolean;
  cpf: string;
  password?: string;
  birthDate: Date;
};

export class User extends Entity<UserProps> {
  constructor(public readonly props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.isActive =
      this.props.isActive === undefined ? true : this.props.isActive;
    User.validate(props);
  }

  static validate(props: UserProps) {
    const validEmail = props.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

    if (!Boolean(validEmail)) throw new Error('Invalid e-mail format!');
  }

  get id() {
    return this.uniqueEntityId.value;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get isActive() {
    return this.props.isActive;
  }

  get cpf() {
    return this.props.cpf;
  }

  get birthDate() {
    return this.props.birthDate;
  }
}
