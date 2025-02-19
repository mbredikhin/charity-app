import crypto from 'crypto';

export function hashSecret(secret: string, key: string, salt: string) {
  const hash = crypto.createHmac('sha256', key).update(secret).digest('hex');
  return hash + salt;
}
