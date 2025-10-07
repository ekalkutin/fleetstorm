import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

import * as dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: resolve(__dirname, '.env.testing') });

  execSync('npx prisma migrate reset --force', {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
};
