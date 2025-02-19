import path from 'path';
import { readdir, readFile } from 'node:fs/promises';
import { pool } from '.';
import { exit } from 'node:process';

const migrationsDir = path.resolve(process.cwd(), `src/database/migrations`);

(async function main(type: 'down' | 'up' = 'up') {
  const migrationsFiles = await readdir(migrationsDir);
  const filePattern = `.${type}.sql`;
  const latestMigrationsFileName = migrationsFiles
    .filter((file) => file.includes(filePattern))
    .sort((a, b) => (a > b ? 1 : -1))
    .at(-1) as string;
  const file = path.join(migrationsDir, latestMigrationsFileName);
  const migrationsQuery = await readFile(file, 'utf-8');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(migrationsQuery);
    await client.query('COMMIT');

    console.log(
      `Migrations from ${latestMigrationsFileName} has been applied successfully`
    );
  } catch (error: any) {
    console.error(
      `Error occured during run migrations from ${latestMigrationsFileName}: ${error.message}`
    );
    console.log('Rollback changes');
    await client.query('ROLLBACK');
  } finally {
    client.release();
    exit();
  }
})(process.argv[2] as 'down' | 'up');
