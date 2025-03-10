import { Pool, QueryResult } from 'pg';
import { User } from '@/models/user.model';
import { pool } from '@/database';

const queries = {
  findUser: {
    name: 'find-user',
    text: 'SELECT * FROM users WHERE email = $1;',
  },
  matchCredentials: {
    name: 'match-credentials',
    text: 'SELECT * FROM users WHERE email = $1 AND password_hash = $2;',
  },
};

export class AuthRepository {
  constructor(private pool: Pool) {}

  async findUser(email: string) {
    const { rows }: QueryResult<User> = await this.pool.query(
      queries.findUser,
      [email]
    );
    return rows[0];
  }

  async matchCredentials(email: string, passwordHash: string) {
    const { rows }: QueryResult<User> = await this.pool.query(
      queries.matchCredentials,
      [email, passwordHash]
    );
    return rows.length !== 0;
  }
}

export const authRepository = new AuthRepository(pool);
