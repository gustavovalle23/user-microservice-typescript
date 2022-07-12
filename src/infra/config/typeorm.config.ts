import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'financial',
  entities: [User],
  synchronize: true,
};
