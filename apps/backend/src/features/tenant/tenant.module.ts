import { Module } from '@nestjs/common';

import { DatabaseModule } from 'shared/persistence/database/database.module';

import { TenantRepositoryPort } from './application/ports/tenant-repository.port';
import { TenantRepositoryAdapter } from './infrastructure/persistence/tenant-repository.adapter';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TenantRepositoryPort,
      useClass: TenantRepositoryAdapter,
    },
  ],
  exports: [TenantRepositoryPort],
})
export class TenantModule {}
