import { FindUserUseCase } from './find-user.use-case';

describe('Unit Test - Find User Use Case', () => {
  const input = {
    name: 'Tester',
    birthDate: new Date(1999, 5, 12),
    documentNo: '44444444444',
    email: 'test@gmail.com',
    isActive: true,
  };

  const userId = '123';

  const MockRepository = () => {
    return {
      findById: jest.fn().mockReturnValue({
        id: userId,
        ...input,
        toJSON: () => {
          return { id: userId, ...input };
        },
      }),
      create: jest.fn().mockReturnValue({ id: userId, ...input }),
    };
  };

  const MockRepositoryNotFound = () => {
    return {
      findById: jest.fn(),
    };
  };

  it('Should find a user', async () => {
    const repository = MockRepository();
    const useCase = new FindUserUseCase.UseCase(repository);
    const output = await useCase.execute({ userId });

    expect(output).toStrictEqual({
      id: userId,
      birthDate: input.birthDate,
      documentNo: input.documentNo,
      email: input.email,
      isActive: input.isActive,
      name: input.name,
    });
  });

  it('Should return an error when user not found', async () => {
    const repository = MockRepositoryNotFound();
    const useCase = new FindUserUseCase.UseCase(repository);
    await expect(useCase.execute({ userId })).rejects.toThrowError(
      'User not found with id 123',
    );
  });
});
