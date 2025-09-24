import { Role as RoleModel } from '@prisma/client';

import { Role } from 'features/iam/domain/aggregates/role.aggregate';

export class RoleMapper {
  public static toModel(role: Role): RoleModel {
    return {
      id: role.id.value,
      code: role.code,
      title: role.title,
      description: role.description,
      permissions: role.permissions.map(permission => permission.code),
    };
  }
}
