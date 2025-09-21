import { Permission } from './permission.vo';

export const SYSTEM_PERMISSIONS = [
  // IAM
  Permission.create({
    code: 'IAM:ROOT',
  }),
];
