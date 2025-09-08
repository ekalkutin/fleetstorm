import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/persistence/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class MainModule {}
