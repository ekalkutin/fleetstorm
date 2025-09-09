import { Module } from '@nestjs/common';

import { DatabaseModule } from 'common/infrastructure/persistence/database/database.module';
import { TenantModule } from 'features/tenant/tenant.module';

@Module({
  imports: [DatabaseModule, TenantModule],
})
export class MainModule {}
