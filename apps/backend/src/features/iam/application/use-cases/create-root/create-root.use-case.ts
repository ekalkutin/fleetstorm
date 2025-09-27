import { Inject, Injectable } from '@nestjs/common';

import { Account } from 'features/iam/domain/aggregates/account.aggregate';
import { Role } from 'features/iam/domain/aggregates/role.aggregate';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { AccountBuilder } from 'features/iam/domain/builders/account.builder';
import { RoleFactory } from 'features/iam/domain/factories/role.factory';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { HasherPort } from 'shared/ports/hasher.port';
import { GUID } from 'shared/value-objects/guid.vo';

import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { RoleRepositoryPort } from '../../ports/role-repository.port';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@Injectable()
export class CreateRootUserUseCase {
  constructor(
    @Inject(ConfigurationService)
    private readonly configurationService: ConfigurationService,

    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,

    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,

    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,

    @Inject(HasherPort)
    private readonly hasher: HasherPort,
  ) {}

  public async execute(): Promise<void> {
    const [role, user] = await Promise.all([
      await this.createRootRoleIfNotExists(),
      await this.createRootUserIfNotExists(),
    ]);

    await this.createAccountIfNotExists(user.id.value, role.id.value);
  }

  private async createAccountIfNotExists(
    userId: string,
    roleId: string,
  ): Promise<Account> {
    const account = new AccountBuilder()
      .withUserId(userId)
      .withRole(roleId)
      .build();

    await this.accountRepository.save(account);

    return account;
  }

  private async createRootUserIfNotExists(): Promise<User> {
    const { username, password } = this.configurationService.ROOT_USER;

    const user = new User(GUID.create(), username, this.hasher.hash(password));

    if (!(await this.userRepository.findByUsername(username))) {
      await this.userRepository.save(user);
    }

    console.log(user);
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
