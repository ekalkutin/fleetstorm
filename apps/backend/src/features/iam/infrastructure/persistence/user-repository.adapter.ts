import { Inject, Injectable } from '@nestjs/common';

import { UserRepositoryPort } from 'features/iam/application/ports/user-repository.port';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { UserBuilder } from 'features/iam/domain/builders/user.builder';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(user: User, tx?: PrismaService): Promise<User> {
    const client = tx ?? this.prisma;

    await client.user.upsert({
      where: {
        id: user.id.value,
      },
      create: UserMapper.toModel(user),
      update: UserMapper.toModel(user),
    });

    if (user.roleIds.length > 0) {
      await client.userRole.deleteMany({ where: { userId: user.id.value } });
    }

    await Promise.all(
      user.roleIds.map(roleId =>
        client.userRole.create({
          data: {
            userId: user.id.value,
            roleId: roleId.value,
          },
        }),
      ),
    );

    return user;
  }

  public async findAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map(user => UserMapper.toDomain(user));
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = new UserBuilder();

    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: {
          select: {
            role: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!result) return null;

    user
      .withId(result.id)
      .withEmail(result.email)
      .withTenantId(result.tenantId);

    result.roles.map(role => user.withRole(role.role.id));

    return user.build();
  }
}
