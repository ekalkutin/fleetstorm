import { Module } from '@nestjs/common';

import { TenantModule } from 'features/tenant/tenant.module';
import { ConfigurationModule } from 'shared/infrastructure/configuration/configuration.module';
import { DatabaseModule } from 'shared/infrastructure/persistence/database/database.module';

import { RoleRepositoryPort } from './application/ports/role-repository.port';
import { UserIdentityPort } from './application/ports/user-identity.port';
import { UserRepositoryPort } from './application/ports/user-repository.port';
import { CreateRootUserUseCase } from './application/use-cases/create-root-user/create-root-user.use-case';
import { RoleRepositoryAdapter } from './infrastructure/persistence/role-repository.adapter';
import { UserRepositoryAdapter } from './infrastructure/persistence/user-repository.adapter';
import { UserIdentityAdapter } from './infrastructure/user-identity.adapter';

@Module({
  imports: [ConfigurationModule, DatabaseModule, TenantModule],
  providers: [
    CreateRootUserUseCase,
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepositoryAdapter,
    },
    {
      provide: UserIdentityPort,
      useClass: UserIdentityAdapter,
    },
  ],
  exports: [UserIdentityPort],
})
export class IAMModule {}
