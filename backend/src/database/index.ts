import { Pool, PoolConfig } from 'pg';
import { databaseConfig } from '@/configs/database.config';

export function createDbPool(config: PoolConfig) {
  const pool = new Pool(config);

  pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
  });

  return pool;
}

export const pool = createDbPool(databaseConfig);
