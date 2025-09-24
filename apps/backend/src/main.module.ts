import { Module } from '@nestjs/common';

import { AuthModule } from 'features/auth/auth.module';
import { BootstrapModule } from 'features/bootstrap/bootstrap.module';
import { IAMModule } from 'features/iam/iam.module';
import { TenantModule } from 'features/tenant/tenant.module';
import { ConfigurationModule } from 'shared/infrastructure/configuration/configuration.module';
import { DatabaseModule } from 'shared/infrastructure/persistence/database/database.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    BootstrapModule,
    AuthModule,
    TenantModule,
    IAMModule,
  ],
})
export class MainModule {}
