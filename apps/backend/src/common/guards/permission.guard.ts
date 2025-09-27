import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionCode } from 'common/constants/permissions';
import { REQUIRED_PERMISSIONS_KEY } from 'common/decoratos/permissions.decorator';
import { AuthenticatedUser } from 'shared/core/domain/entities/authenticated-user.vo';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const definedPermissions = this.reflector.getAllAndOverride<
      PermissionCode[]
    >(REQUIRED_PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!definedPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthenticatedUser = request.user;

    const hasPermission = definedPermissions.some(permission =>
      user.hasPermission(permission),
    );

    return hasPermission;
  }
}
