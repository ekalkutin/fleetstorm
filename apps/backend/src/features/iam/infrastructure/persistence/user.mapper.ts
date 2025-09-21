import { User as UserModel } from '@prisma/client';

import { User } from 'features/iam/domain/aggregates/user.aggregate';
import { UserBuilder } from 'features/iam/domain/builders/user.builder';

export class UserMapper {
  public static toModel(user: User): UserModel {
    return {
      id: user.id.value,
      tenantId: user.tenantId?.value || null,
      email: user.email.value,
    };
  }

  public static toDomain(userModel: UserModel): User {
    return new UserBuilder()
      .withId(userModel.id)
      .withEmail(userModel.email)
      .withTenantId(userModel.tenantId)
      .build();
  }
}
