import { Account as AccountModel } from '@prisma/client';

import { Account } from 'features/iam/domain/aggregates/account.aggregate';
import { AccountBuilder } from 'features/iam/domain/builders/account.builder';

export class AccountMapper {
  public static toModel(account: Account): AccountModel {
    return {
      id: account.id.value,
      tenantId: account.tenantId?.value || null,
      userId: account.userId.value,
    };
  }

  public static toDomain(userModel: AccountModel): Account {
    return new AccountBuilder()
      .withId(userModel.id)
      .withTenantId(userModel.tenantId)
      .build();
  }
}
