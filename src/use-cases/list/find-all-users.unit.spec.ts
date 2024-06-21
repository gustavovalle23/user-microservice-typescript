import { UserRepository } from '@/domain/contracts/repo';
import { User } from '@/domain/entities';
import { UniqueEntityId } from '@/@seedwork/src/domain/value-objects';
import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  const userRepositoryMock: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
  } as any;

  const useCase = new FindAllUsersUseCase.UseCase(userRepositoryMock);

  beforeEach(() => {
    userRepositoryMock.findAll.mockReset();
  });

  it('should return empty array when no users found', async () => {
    userRepositoryMock.findAll.mockResolvedValueOnce([]);

    const result = await useCase.execute({ limit: 10, offset: 0 });

    expect(result).toEqual([]);
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findAll).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
    });
  });

  it('should return mapped users when found', async () => {
    const users: User[] = [
      new User(
        {
          name: 'John',
          email: 'john@example.com',
          cpf: '123456789',
          birthDate: new Date(),
        },
        new UniqueEntityId('111111111111111111111111'),
      ),
      new User(
        {
          name: 'Jane',
          email: 'jane@example.com',
          cpf: '123456789',
          birthDate: new Date(),
        },
        new UniqueEntityId('111111111111111111111112'),
      ),
    ];
    userRepositoryMock.findAll.mockResolvedValueOnce(users);

    const result = await useCase.execute({ limit: 10, offset: 0 });

    expect(result).toEqual(users);
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findAll).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
    });
  });

  it('should handle error thrown by repository', async () => {
    const error = new Error('Something went wrong');
    userRepositoryMock.findAll.mockRejectedValueOnce(error);

    await expect(useCase.execute({ limit: 10, offset: 0 })).rejects.toThrow(
      error,
    );
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findAll).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
    });
  });
});
