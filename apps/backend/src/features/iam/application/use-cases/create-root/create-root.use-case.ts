import { Inject, Injectable } from '@nestjs/common';

import { Role } from 'features/iam/domain/aggregates/role.aggregate';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { RoleFactory } from 'features/iam/domain/factories/role.factory';
import { GUID } from 'shared/domain/value-objects/guid.vo';
import { ConfigurationService } from 'shared/infrastructure/configuration/configuration.service';

import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { RoleRepositoryPort } from '../../ports/role-repository.port';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@Injectable()
export class CreateRootUserUseCase {
  constructor(
    @Inject(ConfigurationService)
    private readonly configurarionService: ConfigurationService,

    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,

    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,

    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async execute(): Promise<void> {
    await this.createRootRoleIfNotExists();
    await this.createRootUserIfNotExists();
  }

  private async createRootUserIfNotExists(): Promise<User> {
    const { username, password } = this.configurarionService.ROOT_USER;

    const user = new User(GUID.create(), username, password);

    if (!(await this.userRepository.findByUsername(username))) {
      await this.userRepository.save(user);
    }

    return user;
  }

  private async createRootRoleIfNotExists(): Promise<Role> {
    const role = RoleFactory.Root;

    if (!(await this.roleRepository.findByCode(role.code))) {
      await this.roleRepository.save(role);
    }

    return role;
  }
}
