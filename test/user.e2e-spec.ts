import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { print } from 'graphql/language/printer';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { UsersModule } from '@/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { graphqlConfig } from '@/infra/config';

describe('User (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'pguser',
          password: 'pgpassword',
          database: 'financial',
          autoLoadEntities: true,
          synchronize: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
    await server.close();
  });

  it('Should return a user', async () => {
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          query {
            findUserById(data: { userId: "1" }) {
              user {
                id
                email
                name
                isActive
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
    await request(server)
      .post('/graphql')
      .send({
        query: print(gql`
          query {
            findUserById(data: { userId: "2" }) {
              user {
                id
                email
                name
                isActive
                documentNo
                birthDate
              }
            }
          }
        `),
      })
      .expect(({ body }) => {
        console.log(body.errors[0]);
        expect(body.errors).toBeDefined();
        expect(body.errors[0]).toMatchObject({
          message: 'User not found with id 2',
          extensions: {
            exception: { name: 'UserNotFound' },
          },
        });
      });
  });
});
