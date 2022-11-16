import { CreateUserUseCase } from './create-user.use.case';

describe('Unit Test create user use case', () => {
  const MockRepository = () => {
    return {
      findById: jest.fn(),
      create: jest.fn(),
    };
  };

  const MockJwt = () => {
    return {
      validate: jest.fn(),
    };
  };

  const input = {
    name: 'Tester',
    birthDate: new Date(1999, 5, 12),
    documentNo: '44444444444',
    email: 'test@gmail.com',
    isActive: true,
    password: 'fakepass',
  };

  it('Should create an user', () => {
    const userRepository = MockRepository();
    const jwtGateway = MockJwt();

    const createUserUseCase = new CreateUserUseCase.UseCase(
      userRepository,
      jwtGateway,
    );

    const output = createUserUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      birthDate: input.birthDate,
      documentNo: input.documentNo,
      email: input.email,
      isActive: input.isActive,
    });
  });
});
