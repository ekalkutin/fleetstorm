import { Inject, Injectable } from '@nestjs/common';

import { RoleRepositoryPort } from 'features/iam/application/ports/role-repository.port';
import { Role } from 'features/iam/domain/aggregates/role.aggregate';
import { PermissionFactory } from 'features/iam/domain/factories/permission.factory';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

import { RoleMapper } from './role.mapper';

@Injectable()
export class RoleRepositoryAdapter implements RoleRepositoryPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(role: Role): Promise<Role> {
    await this.prisma.role.upsert({
      where: {
        id: role.id.value,
      },
      create: RoleMapper.toModel(role),
      update: RoleMapper.toModel(role),
    });

    return role;
  }

  public async findByCode(code: string): Promise<Role | null> {
    const result = await this.prisma.role.findUnique({
      where: {
        code,
      },
    });

    if (!result) return null;

    return Role.create({
      id: result.id,
      code: result.code,
      title: result.title,
      description: result.description,
      permissions: result.permissions.map(code =>
        PermissionFactory.fromCode(code),
      ),
    });
  }
}
