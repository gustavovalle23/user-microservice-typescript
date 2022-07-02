import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { print } from 'graphql/language/printer';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { gql } from 'apollo-server-express';

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          query {
            user(id: "12345") {
              id
              username
              firstName
              lastName
              documentNo
              birthDate
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.data?.user).toMatchSnapshot();
      });
    expect(true).toBe(true);
  });
});
