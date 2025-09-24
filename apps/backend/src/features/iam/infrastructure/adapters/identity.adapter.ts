import { Inject } from '@nestjs/common';

import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';
import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';
import { GUID } from 'shared/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

export class IdentityProviderAdapter implements IdentityProviderPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async findByUsername(
    email: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: email,
      },
      include: {
        account: {
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user?.account) return null;

    const roles = user.account.roles;
    const permissions = roles.reduce((result, { role }) => {
      result.concat(role.permissions);
      return result;
    }, [] as string[]);

    return {
      id: GUID.create(),
      permissions,
    };
  }
}
