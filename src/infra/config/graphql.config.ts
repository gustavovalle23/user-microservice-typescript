import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
};
