import { SetMetadata } from '@nestjs/common';

export const REQUIRED_PERMISSIONS_KEY = 'REQUIRED_PERMISSIONS';

export const RequiredPermissions = (permission: string[]) =>
  SetMetadata(REQUIRED_PERMISSIONS_KEY, permission);
