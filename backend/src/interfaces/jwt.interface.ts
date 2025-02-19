import { JwtPayload } from 'jsonwebtoken';

export interface JwtTokenPayload extends JwtPayload {
  user_id: number;
}
