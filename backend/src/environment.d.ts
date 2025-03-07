declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      APP_PORT: string;
      APP_HOST: string;

      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;

      JWT_TOKEN_SIGNING_KEY: string;
      PASSWORD_SALT: string;
      JWT_TOKEN_EXPIRES_IN: number;
    }
  }
}

export {};
