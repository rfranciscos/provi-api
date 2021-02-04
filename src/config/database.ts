import { ConnectionOptions } from 'typeorm';

export const databaseConfig: ConnectionOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['../entities/*.ts'],
  migrationsTableName: 'custom_migration_table',
  migrations: ['../migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
