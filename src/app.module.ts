import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '@/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig } from '@/infra/config';
import { getEnvPath } from '@/common';
import { TypeOrmConfigService } from '@/infra/shared/typeorm';

const envFilePath: string = getEnvPath(`${__dirname}`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
