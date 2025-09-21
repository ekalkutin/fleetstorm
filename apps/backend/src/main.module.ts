import { Module } from '@nestjs/common';

import { IAMModule } from 'features/iam/iam.module';
import { TenantModule } from 'features/tenant/tenant.module';
import { ConfigurationModule } from 'shared/infrastructure/configuration/configuration.module';
import { DatabaseModule } from 'shared/infrastructure/persistence/database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, TenantModule, IAMModule],
})
export class MainModule {}
