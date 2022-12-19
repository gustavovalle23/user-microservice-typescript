import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('Unit Test - Find User Use Case', () => {
  const user1 = {
    id: '123',
    name: 'Tester',
    birthDate: new Date(1999, 5, 12),
    cpf: '44444444444',
    email: 'test@gmail.com',
    isActive: true,
  };

  const user2 = {
    id: '456',
    name: 'Tester',
    birthDate: new Date(1999, 5, 12),
    cpf: '44444444444',
    email: 'test@gmail.com',
    isActive: true,
  };

  const users = [
    {
      ...user1,
    },
    {
      ...user2,
    },
  ];

  const MockRepository = () => {
    return {
      findAll: jest.fn().mockReturnValue(users),
      findById: jest.fn(),
      create: jest.fn(),
    };
  };

  it('Should list all users', async () => {
    const repository = MockRepository();
    const useCase = new FindAllUsersUseCase.UseCase(repository);
    const output = await useCase.execute();
    expect(output).toStrictEqual([user1, user2]);
  });
});
