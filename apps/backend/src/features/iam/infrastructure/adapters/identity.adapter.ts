import { Inject } from '@nestjs/common';

import { PermissionCode } from 'common/constants/permissions';
import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';
import { GUID } from 'shared/core/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

export class IdentityProviderAdapter implements IdentityProviderPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async findByUsername(email: string): Promise<{
    readonly id: GUID;
    readonly hashedPassword: string;
    readonly permissions: PermissionCode[];
  } | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: email,
      },
      select: {
        id: true,
        hashedPassword: true,
        account: {
          select: {
            roles: {
              select: {
                role: {
                  select: {
                    permissions: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user?.account) return null;

    const roles = user.account.roles;
    const permissions = roles.reduce((result, { role }) => {
      result = result.concat(role.permissions as PermissionCode[]);
      return result;
    }, [] as PermissionCode[]);

    return {
      id: GUID.create(user.id),
      hashedPassword: user.hashedPassword,
      permissions,
    };
  }
}
