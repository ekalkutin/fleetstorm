import { Inject, Injectable } from '@nestjs/common';

import { AccountRepositoryPort } from 'features/iam/application/ports/account-repository.port';
import { Account } from 'features/iam/domain/aggregates/account.aggregate';
import { PrismaService } from 'shared/persistence/database/prisma.service';

import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountRepositoryAdapter implements AccountRepositoryPort {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  public async save(account: Account, tx?: PrismaService): Promise<Account> {
    const client = tx ?? this.prisma;

    await client.account.upsert({
      where: {
        id: account.id.value,
      },
      create: AccountMapper.toModel(account),
      update: AccountMapper.toModel(account),
    });

    if (account.roleIds.length > 0) {
      await client.accountRole.deleteMany({
        where: { accountId: account.id.value },
      });
    }

    await Promise.all(
      account.roleIds.map(roleId =>
        client.accountRole.create({
          data: {
            accountId: account.id.value,
            roleId: roleId.value,
          },
        }),
      ),
    );

    return account;
  }

  public async findAll(): Promise<Account[]> {
    const results = await this.prisma.account.findMany();

    return results.map(result => AccountMapper.toDomain(result));
  }

  public async findByUsername(username: string): Promise<Account | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        account: true,
      },
    });

    if (!result || !result.account) return null;

    return AccountMapper.toDomain(result.account);
  }
}
