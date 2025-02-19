import jwt from 'jsonwebtoken';
import { JwtTokenPayload } from '@/interfaces/jwt.interface';

const signingKey = process.env.JWT_TOKEN_SIGNING_KEY as string;

export function generateJwtToken(data: JwtTokenPayload['data']) {
  const token = jwt.sign(data, signingKey, {
    expiresIn: +(process.env.JWT_TOKEN_EXPIRES_IN as unknown as number),
    algorithm: 'HS256',
  });
  return token;
}

export function parseJwtToken(token: string) {
  const payload = jwt.verify(token, signingKey);
  if (typeof payload === 'string') {
    return {};
  }
  return payload;
}
