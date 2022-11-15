import { User } from './user';

describe('User Unit Tests', () => {
  const props = {
    name: 'Test',
    birthDate: new Date(1999, 6, 26),
    documentNo: '222',
    email: 'test@gmail.com',
  };

  it('Should constructor of user', () => {
    const user = new User({ ...props });

    expect(user.birthDate).toBeInstanceOf(Date);
    expect(user.birthDate).toStrictEqual(props.birthDate);
    expect(user.documentNo).toStrictEqual(props.documentNo);
    expect(user.email).toStrictEqual(props.email);
    expect(user.name).toStrictEqual(props.name);
    expect(user.isActive).toStrictEqual(true);
    expect(user.id).toBeDefined();
  });

  it('Should return an error when pass an invalid email', async () => {
    const user = () => {
      new User({ ...props, email: '', isActive: true });
    };
    expect(user).toThrow(Error);
    expect(user).toThrow('Invalid e-mail format!');
  });
});
