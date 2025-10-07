import { Permissions } from 'common/constants/permissions';

import { Permission } from './permission.vo';

export const SYSTEM_PERMISSIONS = [
  // IAM
  Permission.create({
    code: Permissions.IAM.Root,
  }),
  Permission.create({
    code: Permissions.IAM.Account.READ,
  }),
  Permission.create({
    code: Permissions.IAM.Account.UPDATE,
  }),
];
