import { CreateUserUseCase } from './create-user.use.case';

describe('Unit Test create user use case', () => {
  const input = {
    name: 'Tester',
    birthDate: new Date(1999, 5, 12),
    cpf: '44444444444',
    email: 'test@gmail.com',
    isActive: true,
  };

  const MockRepository = () => {
    return {
      findById: jest.fn().mockReturnValue({ id: '123', ...input }),
      create: jest.fn().mockReturnValue({ id: '123', ...input }),
    };
  };

  const MockJwt = () => {
    return {
      createAccessToken: jest
        .fn()
        .mockReturnValue({ accessToken: 'accessToken' }),
    };
  };

  it('Should create an user', async () => {
    const userRepository = MockRepository();
    const jwtGateway = MockJwt();

    const createUserUseCase = new CreateUserUseCase.UseCase(
      userRepository,
      jwtGateway,
    );

    const output = await createUserUseCase.execute({
      ...input,
      password: 'fakepassword',
    });

    expect(output).toEqual({
      user: {
        id: expect.any(String),
        name: input.name,
        birthDate: input.birthDate,
        cpf: input.cpf,
        email: input.email,
        isActive: input.isActive,
      },
      accessToken: expect.any(String),
    });
  });
});
