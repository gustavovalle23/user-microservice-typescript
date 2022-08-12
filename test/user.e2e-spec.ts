import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { print } from 'graphql/language/printer';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { AppModule } from '@/infra/modules';

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should return a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          query FindUserById {
            findUserById(id: "62f5b071f6d8335216f12df2") {
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
        expect(body.data?.findUserById?.user).toMatchSnapshot();
      });
  });

  it('Should return an error when send a invalid user id', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          query FindUserById {
            findUserById(id: "62f5b071f6d8335216f12df1") {
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
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          query AllUsers {
            allUsers {
              users {
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
        expect(body.data?.allUsers).toMatchSnapshot();
      });
  });

  it('Should create a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          mutation Mutation {
            createUser(
              user: {
                birthDate: "1999-06-26"
                documentNo: "44744675822"
                email: "gustavo.vallerp@hotmail.com"
                isActive: true
                name: "Gusta"
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
        expect(body.data?.allUsers).toMatchSnapshot();
      });
  });
});
