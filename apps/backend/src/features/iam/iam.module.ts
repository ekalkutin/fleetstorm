import { Module } from '@nestjs/common';

import { TenantModule } from 'features/tenant/tenant.module';
import { ConfigurationModule } from 'shared/infrastructure/configuration/configuration.module';
import { DatabaseModule } from 'shared/infrastructure/persistence/database/database.module';

import { AccountRepositoryPort } from './application/ports/account-repository.port';
import { IdentityProviderPort } from './application/ports/identity-provider.port';
import { RoleRepositoryPort } from './application/ports/role-repository.port';
import { UserRepositoryPort } from './application/ports/user-repository.port';
import { CreateRootUserUseCase } from './application/use-cases/create-root/create-root.use-case';
import { AccountRepositoryAdapter } from './infrastructure/adapters/account/account-repository.adapter';
import { RoleRepositoryAdapter } from './infrastructure/adapters/role/role-repository.adapter';
import { UserRepositoryAdapter } from './infrastructure/adapters/user/user-repository.adapter';
import { AccountIdentityAdapter } from './infrastructure/identity-provider.adapter';

@Module({
  imports: [ConfigurationModule, DatabaseModule, TenantModule],
  providers: [
    CreateRootUserUseCase,
    {
      provide: IdentityProviderPort,
      useClass: AccountIdentityAdapter,
    },
    {
      provide: AccountRepositoryPort,
      useClass: AccountRepositoryAdapter,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepositoryAdapter,
    },
  ],
  exports: [CreateRootUserUseCase, IdentityProviderPort],
})
export class IAMModule {}
