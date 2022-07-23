import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { print } from 'graphql/language/printer';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { gql } from 'apollo-server-express';

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Should return a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          query {
            user(userId: "1") {
              id
              email
              name
              isActive
              documentNo
              birthDate
            }
          }
        `),
      })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined();
        expect(body.data?.user).toMatchSnapshot();
      });
    expect(true).toBe(true);
  });
});
