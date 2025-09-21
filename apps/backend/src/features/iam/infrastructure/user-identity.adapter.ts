import { Inject, Injectable } from '@nestjs/common';

import { AuthenticatedUser } from 'shared/domain/value-objects/authenticated-user.vo';
import { GUID } from 'shared/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

import { UserIdentityPort } from '../application/ports/user-identity.port';

@Injectable()
export class UserIdentityAdapter implements UserIdentityPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) return null;
    console.log({ user });

    return new AuthenticatedUser(GUID.create(user.id), [], []);
  }
}
