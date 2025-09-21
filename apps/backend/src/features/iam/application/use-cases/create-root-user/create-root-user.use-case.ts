import { Inject, Injectable } from '@nestjs/common';

import { Role } from 'features/iam/domain/aggregates/role.aggregate';
import { UserBuilder } from 'features/iam/domain/builders/user.builder';
import { RoleFactory } from 'features/iam/domain/factories/role.factory';
import { ConfigurationService } from 'shared/infrastructure/configuration/configuration.service';

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
  ) {}

  public async execute(): Promise<void> {
    const role = await this.createRootRoleIfNotExists();

    const root_email = this.configurarionService.ROOT_EMAIL;

    const user = new UserBuilder()
      .withEmail(root_email)
      .withRole(role.id)
      .build();

    if (!(await this.userRepository.findByEmail(root_email))) {
      await this.userRepository.save(user);
    }
  }

  private async createRootRoleIfNotExists(): Promise<Role> {
    const role = RoleFactory.Root;

    if (!(await this.roleRepository.findByCode(role.code))) {
      await this.roleRepository.save(role);
    }

    return role;
  }
}
