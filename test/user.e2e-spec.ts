import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { print } from 'graphql/language/printer';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { AppModule } from '@/infra/modules';
import mongoose from 'mongoose';
import { Server } from 'http';
import { users } from './seed';

describe('User (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    server.listen();

    await mongoose
      .createConnection(
        'mongodb://test:test@mongo:27017/admin?serverSelectionTimeoutMS=2000&authSource=admin',
      )
      .collection('users')
      .insertMany(users);
  });

  afterEach(async () => {
    await mongoose
      .createConnection(
        'mongodb://test:test@mongo:27017/admin?serverSelectionTimeoutMS=2000&authSource=admin',
      )
      .collection('users')
      .deleteMany({});

    server?.close();
    await mongoose.disconnect();
    await app.close();
  });

  it('Should return an user', async () => {
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          query FindUserById {
            findUserById(id: "111111111111111111111111") {
              id
              name
              isActive
              email
              documentNo
              birthDate
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined();
        expect(body.data?.findUserById?.user).toMatchSnapshot();
      });
  });

  it('Should return an error when send a invalid user id', async () => {
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          query FindUserById {
            findUserById(id: "62f5b071f6d8335216f12df1") {
              id
              name
              isActive
              email
              documentNo
              birthDate
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.errors).toBeDefined();
        expect(body.errors[0]).toMatchObject({
          message: 'User not found with id 62f5b071f6d8335216f12df1',
          extensions: {
            exception: { name: 'UserNotFound' },
          },
        });
      });
  });

  it('Should return all users', async () => {
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          query AllUsers {
            allUsers {
              id
              name
              isActive
              email
              documentNo
              birthDate
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined();
        expect(body.data?.allUsers).toMatchSnapshot();
      });
  });

  it('Should create a user', async () => {
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          mutation Mutation {
            createUser(
              user: {
                birthDate: "1999-06-26"
                documentNo: "44444444444"
                email: "test@gmail.com"
                isActive: true
                name: "Test"
                password: "123456"
              }
            ) {
              user {
                id
                name
                isActive
                email
                documentNo
                birthDate
              }
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined();
        expect(body.data.createUser.user.birthDate).toStrictEqual(
          '1999-06-26T00:00:00.000Z',
        );
        expect(body.data.createUser.user.documentNo).toStrictEqual(
          '44444444444',
        );
        expect(body.data.createUser.user.email).toStrictEqual('test@gmail.com');
        expect(body.data.createUser.user.isActive).toStrictEqual(true);
        expect(body.data.createUser.user.name).toStrictEqual('Test');
      });
  });
});
