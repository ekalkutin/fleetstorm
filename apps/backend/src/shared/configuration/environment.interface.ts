interface RootAccountEnv {
  readonly ROOT_USERNAME: string;
  readonly ROOT_PASSWORD: string;
}

interface DatabaseEnv {
  readonly DB_USERNAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_NAME: string;
  readonly DB_HOST: string;
  readonly DB_PORT: string;
}

export interface EnvironmentConfig extends RootAccountEnv, DatabaseEnv {
  readonly NODE_ENV: NodeEnv;
  readonly APP_JWT_SECRET: string;
}

export type NodeEnv = 'development' | 'testing';
