import { Inject } from '@nestjs/common';

import { IdentityProviderPort } from 'features/iam/application/ports/identity-provider.port';
import { PrismaService } from 'shared/persistence/database/prisma.service';
import { AuthenticatedUser } from 'shared/value-objects/authenticated-user.vo';
import { GUID } from 'shared/value-objects/guid.vo';

export class IdentityProviderAdapter implements IdentityProviderPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async findByUsername(
    email: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: email,
      },
      select: {
        id: true,
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
      result = result.concat(role.permissions);
      return result;
    }, [] as string[]);

    return new AuthenticatedUser(GUID.create(user.id), permissions);
  }
}
