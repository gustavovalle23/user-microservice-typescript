import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@/infra/entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'postgres',
  entities: [User],
  synchronize: true,
};
