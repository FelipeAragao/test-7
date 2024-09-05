import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

dotenv.config();

const typeOrmConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  database: process.env.POSTGRES_NAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
});

export default typeOrmConfig;
