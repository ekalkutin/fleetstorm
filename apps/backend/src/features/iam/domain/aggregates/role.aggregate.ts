import { GUID } from 'shared/value-objects/guid.vo';

import { Permission } from '../value-objects/permissions/permission.vo';

export class Role {
  constructor(
    public readonly id: GUID,
    public readonly code: string,
    public readonly title: string,
    public readonly description: string,
    public readonly permissions: Permission[],
  ) {}

  public static create(props?: {
    id?: string;
    code?: string;
    title?: string;
    description?: string;
    permissions?: Permission[];
  }): Role {
    const id = GUID.create(props?.id);
    const code = props?.code || 'ROOT_ROLE';
    const title = props?.title || 'Default role title';
    const description = props?.description || 'Default role description';
    const permissions = props?.permissions || [];

    return new Role(id, code, title, description, permissions);
  }

  public addPermission(permission: Permission) {
    this.permissions.push(permission);
  }
}
