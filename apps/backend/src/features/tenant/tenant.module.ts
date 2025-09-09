import { Module } from '@nestjs/common';

import { DatabaseModule } from 'common/infrastructure/persistence/database/database.module';

import { TenantRepository } from './domain/repositories/tenant.repository';
import { TenantRepositoryImpl } from './infrastructure/tenant.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TenantRepository,
      useClass: TenantRepositoryImpl,
    },
  ],
})
export class TenantModule {}
