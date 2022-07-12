import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '@/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig, graphqlConfig } from '@/infra/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
