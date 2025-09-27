import { PermissionCode } from 'common/constants/permissions';

import { GUID } from './guid.vo';

export type AuthenticatedUserPayload = {
  readonly id: string;
  readonly permissions: Array<string>;
};

export class AuthenticatedUser {
  constructor(
    public readonly id: GUID,
    public readonly permissions: string[],
  ) {}

  public hasPermission(requiredPermission: PermissionCode): boolean {
    return this.permissions.some(
      permission => permission === requiredPermission,
    );
  }
}
