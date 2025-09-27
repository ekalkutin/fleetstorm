import { Permission } from '../value-objects/permissions/permission.vo';
import { SYSTEM_PERMISSIONS } from '../value-objects/permissions/system-permissions.vo';

export class PermissionFactory {
  public static fromCode(code: string): Permission {
    const permission = SYSTEM_PERMISSIONS.find(
      systemPermissions => systemPermissions.code === code,
    );

    if (!permission) throw new Error(`Unknown permission code: ${code}`);

    return Permission.create({
      code: permission.code,
      description: permission.description,
    });
  }
}
