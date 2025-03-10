import { StatusCodes } from 'http-status-codes';
import { authRepository, AuthRepository } from '@/repositories/auth.repository';
import { generateJwtToken } from '@/helpers/jwt.helper';
import { hashSecret } from '@/helpers/crypto.helper';
import { ApiError } from '@/helpers/api.helper';

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async getAuthToken(email: string, password: string) {
    const passwordHash = hashSecret(
      password,
      process.env.JWT_TOKEN_SIGNING_KEY as string,
      process.env.PASSWORD_SALT as string
    );
    const user = await this.repository.findUser(email);
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', {
        email: ['There is no user registered with this email address'],
      });
    }
    const ok = await this.repository.matchCredentials(email, passwordHash);
    if (!ok) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', {
        password: ['Invalid password'],
      });
    }
    const token = generateJwtToken({ user_id: user.id });
    return token;
  }
}

export const authService = new AuthService(authRepository);
