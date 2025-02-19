require('dotenv').config();
import { PoolConfig } from 'pg';

export const databaseConfig: PoolConfig = {
  user: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  host: process.env.POSTGRES_HOST as string,
  port: process.env.POSTGRES_PORT as unknown as number,
  database: process.env.POSTGRES_DB as string,
  max: 20,
  idleTimeoutMillis: 30_000,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};
