import { DataSource } from 'typeorm';
import { databaseConfig } from './src/shared/config';

export default new DataSource({
  ...databaseConfig,
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
});