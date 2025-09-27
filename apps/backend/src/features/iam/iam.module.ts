import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TenantModule } from 'features/tenant/tenant.module';
import { HasherAdapter } from 'shared/adapters/hasher.adapter';
import { ConfigurationModule } from 'shared/configuration/configuration.module';
import { DatabaseModule } from 'shared/persistence/database/database.module';
import { HasherPort } from 'shared/ports/hasher.port';

import { CreateRootController } from './api/create-root.controller';
import { QueryUsersController } from './api/query-users.controller';
import { AccountRepositoryPort } from './application/ports/account-repository.port';
import { IdentityProviderPort } from './application/ports/identity-provider.port';
import { RoleRepositoryPort } from './application/ports/role-repository.port';
import { UserRepositoryPort } from './application/ports/user-repository.port';
import { CreateRootUserUseCase } from './application/use-cases/create-root/create-root.use-case';
import { AccountRepositoryAdapter } from './infrastructure/adapters/account-repository.adapter';
import { IdentityProviderAdapter } from './infrastructure/adapters/identity.adapter';
import { RoleRepositoryAdapter } from './infrastructure/adapters/role-repository.adapter';
import { UserRepositoryAdapter } from './infrastructure/adapters/user-repository.adapter';

@Module({
  imports: [JwtModule, ConfigurationModule, DatabaseModule, TenantModule],
  controllers: [CreateRootController, QueryUsersController],
  providers: [
    {
      provide: HasherPort,
      useClass: HasherAdapter,
    },

    CreateRootUserUseCase,

    {
      provide: IdentityProviderPort,
      useClass: IdentityProviderAdapter,
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
