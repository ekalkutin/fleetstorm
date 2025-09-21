import { Role } from '../aggregates/role.aggregate';

import { PermissionFactory } from './permission.factory';

export class RoleFactory {
  public static get Root(): Role {
    return Role.create({
      code: 'Root',
      title: 'Super user',
      description: 'Super user has full access',
      permissions: [PermissionFactory.Root],
    });
  }
}
