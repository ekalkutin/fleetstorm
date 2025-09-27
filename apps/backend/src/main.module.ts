import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from 'features/auth/auth.module';
import { IAMModule } from 'features/iam/iam.module';
import { TenantModule } from 'features/tenant/tenant.module';
import { ConfigurationModule } from 'shared/configuration/configuration.module';
import { DatabaseModule } from 'shared/persistence/database/database.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CqrsModule.forRoot(),
    AuthModule,
    TenantModule,
    IAMModule,
  ],
})
export class MainModule {}
