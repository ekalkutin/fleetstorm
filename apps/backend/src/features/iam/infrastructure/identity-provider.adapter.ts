import { Inject, Injectable } from '@nestjs/common';

import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';
import { GUID } from 'shared/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

import { IdentityProviderPort } from '../application/ports/identity-provider.port';

@Injectable()
export class AccountIdentityAdapter implements IdentityProviderPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async findByUsername(
    username: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
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

    if (!user) return null;
    console.log({ user });

    return new AuthenticatedUser(GUID.create(user.id), []);
  }
}
