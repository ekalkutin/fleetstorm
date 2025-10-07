import { Controller, Get, UseGuards } from '@nestjs/common';

import { Permissions } from 'common/constants/permissions';
import { RequiredPermissions } from 'common/decoratos/permissions.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { PermissionGuard } from 'common/guards/permission.guard';

@UseGuards(AuthGuard, PermissionGuard)
@Controller('/iam/users')
export class QueryUsersController {
  constructor() {}

  @RequiredPermissions([Permissions.IAM.Root, Permissions.IAM.Account.READ])
  @Get('/')
  async query() {
    return [];
  }
}
