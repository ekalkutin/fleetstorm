import { Inject, Injectable } from '@nestjs/common';

import { UserRepositoryPort } from 'features/iam/application/ports/user-repository.port';
import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { GUID } from 'shared/core/domain/value-objects/guid.vo';
import { PrismaService } from 'shared/infrastructure/persistence/database/prisma.service';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(user: User): Promise<User> {
    const result = await this.prisma.user.upsert({
      where: {
        id: user.id.value,
      },
      create: {
        id: user.id.value,
        username: user.username,
        hashedPassword: user.hashedPassword,
      },
      update: {
        username: user.username,
        hashedPassword: user.hashedPassword,
      },
    });

    return new User(
      GUID.create(result.id),
      result.username,
      result.hashedPassword,
    );
  }

  public async findByUsername(username: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!result) return null;

    return new User(
      GUID.create(result.id),
      result.username,
      result.hashedPassword,
    );
  }

  public async find(): Promise<User[]> {
    const results = await this.prisma.user.findMany();

    return results.map(
      result =>
        new User(
          GUID.create(result.id),
          result.username,
          result.hashedPassword,
        ),
    );
  }
}
