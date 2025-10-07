import { type NodeEnv, type EnvironmentConfig } from './environment.interface';

export default (): EnvironmentConfig => {
  return {
    NODE_ENV: process.env.NODE_ENV! as NodeEnv,
    APP_JWT_SECRET: process.env.APP_JWT_SECRET!,
    APP_SALT: process.env.APP_SALT!,

    ROOT_USERNAME: process.env.ROOT_EMAIL!,
    ROOT_PASSWORD: process.env.ROOT_PASSWORD!,

    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_NAME: process.env.DB_NAME!,
    DB_USERNAME: process.env.DB_USERNAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
  };
};
