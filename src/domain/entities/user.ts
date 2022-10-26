type UserProps = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  documentNo: string;
  password: string;
  birthDate: Date;
};

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _role: string;
  private _isActive: boolean;
  private _documentNo: string;
  private _password: string;
  private _birthDate: Date;

  constructor(public readonly props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._role = props.role;
    this._isActive = props.isActive;
    this._documentNo = props.documentNo;
    this._password = props.password;
    this._birthDate = props.birthDate;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get role() {
    return this._role;
  }

  get isActive() {
    return this._isActive;
  }

  get documentNo() {
    return this._documentNo;
  }

  get password() {
    return this._password;
  }

  get birthDate() {
    return this._birthDate;
  }
}
