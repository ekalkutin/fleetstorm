import { execSync } from 'node:child_process';

import * as dotenv from 'dotenv';

module.exports = async () => {
  dotenv.config({ path: '.env.testing' });

  console.log('Resetting test database...');
  console.log(`ENV: ${process.env.NODE_ENV}`);
  console.log(`DB: ${process.env.DATABASE_URL}`);
  execSync(
    'npx prisma migrate reset --force --skip-seed --schema=prisma/schema.prisma && npx prisma generate',
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  );
};
