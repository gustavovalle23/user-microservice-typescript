import { FindUserUseCase } from '@/use-cases/find';
import { UserResolver } from './user.resolver';
import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '@/use-cases/create';
import { FindAllUsersUseCase } from '@/use-cases/list';

const user = {
  id: '123',
  name: 'Tester',
  birthDate: new Date(1999, 5, 12),
  cpf: '44444444444',
  email: 'test@gmail.com',
  isActive: true,
};

describe('Unit Tests - User Resolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const findUserUseCase = {
      provide: FindUserUseCase.UseCase,
      useFactory: () => ({
        execute: jest.fn(() => {
          return {
            id: '123',
            name: 'Tester',
            birthDate: new Date(1999, 5, 12),
            cpf: '44444444444',
            email: 'test@gmail.com',
            isActive: true,
          };
        }),
      }),
    };

    const findAllUserUseCase = {
      provide: FindAllUsersUseCase.UseCase,
      useFactory: () => ({
        execute: jest.fn(() => {
          return {
            users: [
              {
                id: '123',
                name: 'Tester',
                birthDate: new Date(1999, 5, 12),
                cpf: '44444444444',
                email: 'test@gmail.com',
                isActive: true,
              },
              {
                id: '456',
                name: 'Tester',
                birthDate: new Date(1999, 5, 12),
                cpf: '44444444444',
                email: 'test@gmail.com',
                isActive: true,
              },
            ],
          };
        }),
      }),
    };

    const createUserUseCase = {
      provide: CreateUserUseCase.UseCase,
      useFactory: () => ({
        execute: jest.fn(() => {
          return {
            user: {
              id: '123',
              name: 'Tester',
              birthDate: new Date(1999, 5, 12),
              cpf: '44444444444',
              email: 'test@gmail.com',
              isActive: true,
            },
            accessToken: 'fakeaccesstoken',
          };
        }),
      }),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UserResolver,
        findUserUseCase,
        findAllUserUseCase,
        createUserUseCase,
      ],
    }).compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
  });

  it('Should find user by id', async () => {
    expect(await userResolver.findUserById('123')).toMatchSnapshot();
  });

  it('Should create a user', async () => {
    expect(
      await userResolver.createUser({ ...user, password: '123' }),
    ).toMatchSnapshot();
  });

  it('Should list all users', async () => {
    expect(await userResolver.allUsers()).toMatchSnapshot();
  });
});
