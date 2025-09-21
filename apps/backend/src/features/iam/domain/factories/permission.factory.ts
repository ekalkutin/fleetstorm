import { Permission } from '../value-objects/permissions/permission.vo';
import { SYSTEM_PERMISSIONS } from '../value-objects/permissions/system-permissions.vo';

export class PermissionFactory {
  public static fromCode(code: string): Permission {
    const permission = SYSTEM_PERMISSIONS.find(sp => sp.code === code);

    if (!permission) throw new Error(`Unknown permission code: ${code}`);

    return Permission.create({
      code: permission.code,
      description: permission.description,
    });
  }

  public static get Root(): Permission {
    const root = SYSTEM_PERMISSIONS.find(
      systemPermission => systemPermission.code === 'IAM:ROOT',
    );

    if (!root) throw new Error(`Root permission doesn't exist`);

    return root;
  }
}
